from django.urls import reverse
from rest_framework.test import APITestCase

from accounts.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
from io import BytesIO

class BusinessCreateTests(APITestCase):

    def setUp(self):
        self.customer = User.objects.create_user(
            email="customer@test.com",
            password="TestPassword123!",
            account_type="customer",
            full_name="Test Customer",
        )

        self.business_user = User.objects.create_user(
            email="business@test.com",
            password="TestPassword123!",
            account_type="business",
            full_name="Test Business Owner",
        )

    def test_business_account_can_create_business(self):
        self.client.force_authenticate(user=self.business_user)

        response = self.client.post(
            reverse("business-list-create"),
            {
                "name": "Test Homestay",
                "category": "hotel",
                "short_description": "A test homestay",
                "description": "A test business description",
                "location": "Mandi",
                "phone": "9876543210",
                "email": "homestay@test.com",
            },
        )

        self.assertEqual(response.status_code, 201)

    def test_customer_cannot_create_business(self):
        self.client.force_authenticate(user=self.customer)

        response = self.client.post(
            reverse("business-list-create"),
            {
                "name": "Test Business",
                "category": "hotel",
                "short_description": "Test description",
                "description": "Test business description",
                "location": "Mandi",
                "phone": "9876543210",
                "email": "business@test.com",
            },
        )

        self.assertEqual(response.status_code, 403)

    def test_business_owner_can_update_business(self):
        self.client.force_authenticate(user=self.business_user)

        create_response = self.client.post(
            reverse("business-list-create"),
            {
                "name": "Test Homestay",
                "category": "hotel",
                "short_description": "A test homestay",
                "description": "A test business description",
                "location": "Mandi",
                "phone": "9876543210",
                "email": "homestay@test.com",
            },
        )

        business_id = create_response.data["id"]

        update_response = self.client.patch(
            reverse("business-detail", kwargs={"pk": business_id}),
            {
                "name": "Updated Homestay",
            },
        )

        self.assertEqual(update_response.status_code, 200)
        self.assertEqual(
            update_response.data["name"],
            "Updated Homestay",
        )

    def test_other_user_cannot_update_business(self):
        # Create the business owner
        self.client.force_authenticate(user=self.business_user)

        create_response = self.client.post(
            reverse("business-list-create"),
            {
                "name": "Test Homestay",
                "category": "hotel",
                "short_description": "A test homestay",
                "description": "A test business description",
                "location": "Mandi",
                "phone": "9876543210",
                "email": "homestay@test.com",
            },
        )

        business_id = create_response.data["id"]

        # Create another user
        other_user = User.objects.create_user(
            email="other@test.com",
            password="TestPassword123!",
            account_type="business",
            full_name="Other Business Owner",
        )

        # Login as the other user
        self.client.force_authenticate(user=other_user)

        update_response = self.client.patch(
            reverse("business-detail", kwargs={"pk": business_id}),
            {
                "name": "Hacked Business Name",
            },
        )

        self.assertEqual(update_response.status_code, 403)

    def test_business_list_is_public(self):
        response = self.client.get(
            reverse("business-list-create")
        )

        self.assertEqual(response.status_code, 200)

    def test_business_detail_is_public(self):
        self.client.force_authenticate(user=self.business_user)

        create_response = self.client.post(
            reverse("business-list-create"),
            {
                "name": "Test Homestay",
                "category": "hotel",
                "short_description": "A test homestay",
                "description": "A test business description",
                "location": "Mandi",
                "phone": "9876543210",
                "email": "homestay@test.com",
            },
        )

        business_id = create_response.data["id"]

        # Remove authentication
        self.client.force_authenticate(user=None)

        response = self.client.get(
            reverse(
                "business-detail",
                kwargs={"pk": business_id},
            )
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["name"], "Test Homestay")

    def test_categories_are_public(self):
        response = self.client.get(
            reverse("category-list")
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 10)

    def test_business_search(self):
        self.client.force_authenticate(user=self.business_user)

        self.client.post(
            reverse("business-list-create"),
            {
                "name": "Prince Homestay",
                "category": "hotel",
                "location": "Mandi",
            },
        )

        self.client.post(
            reverse("business-list-create"),
            {
                "name": "Mountain Cafe",
                "category": "restaurant",
                "location": "Shimla",
            },
        )

        self.client.force_authenticate(user=None)

        response = self.client.get(
            reverse("business-list-create"),
            {"search": "Prince"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Prince Homestay")


    def test_business_location_filter(self):
        self.client.force_authenticate(user=self.business_user)

        self.client.post(
            reverse("business-list-create"),
            {
                "name": "Mandi Homestay",
                "category": "hotel",
                "location": "Mandi, Himachal Pradesh",
            },
        )

        self.client.post(
            reverse("business-list-create"),
            {
                "name": "Shimla Hotel",
                "category": "hotel",
                "location": "Shimla, Himachal Pradesh",
            },
        )

        self.client.force_authenticate(user=None)

        response = self.client.get(
            reverse("business-list-create"),
            {"location": "Mandi"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Mandi Homestay")

    def test_business_category_filter(self):
        self.client.force_authenticate(user=self.business_user)

        self.client.post(
            reverse("business-list-create"),
            {
                "name": "Mountain Hotel",
                "category": "hotel",
                "location": "Mandi",
            },
        )

        self.client.post(
            reverse("business-list-create"),
            {
                "name": "Mountain Cafe",
                "category": "restaurant",
                "location": "Mandi",
            },
        )

        self.client.force_authenticate(user=None)

        response = self.client.get(
            reverse("business-list-create"),
            {"category": "hotel"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Mountain Hotel")

    def test_business_owner_can_upload_image(self):
        self.client.force_authenticate(user=self.business_user)

        create_response = self.client.post(
            reverse("business-list-create"),
            {
                "name": "Test Homestay",
                "category": "hotel",
                "location": "Mandi",
            },
        )

        business_id = create_response.data["id"]

        image_file = BytesIO()

        image = Image.new(
            "RGB",
            (100, 100),
            color="white",
        )

        image.save(
            image_file,
            format="JPEG",
        )

        image_file.seek(0)

        uploaded_image = SimpleUploadedFile(
            "test.jpg",
            image_file.read(),
            content_type="image/jpeg",
        )

        response = self.client.post(
            reverse(
                "business-image-create",
                kwargs={"business_id": business_id},
            ),
            {
                "image": uploaded_image,
            },
            format="multipart",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["business"], business_id)

    def test_other_user_cannot_upload_image(self):
        self.client.force_authenticate(user=self.business_user)

        create_response = self.client.post(
            reverse("business-list-create"),
            {
                "name": "Test Homestay",
                "category": "hotel",
                "location": "Mandi",
            },
        )

        business_id = create_response.data["id"]

        image_file = BytesIO()

        image = Image.new(
            "RGB",
            (100, 100),
            color="white",
        )

        image.save(
            image_file,
            format="JPEG",
        )

        image_file.seek(0)

        uploaded_image = SimpleUploadedFile(
            "test.jpg",
            image_file.read(),
            content_type="image/jpeg",
        )

        self.client.force_authenticate(user=self.customer)

        response = self.client.post(
            reverse(
                "business-image-create",
                kwargs={"business_id": business_id},
            ),
            {
                "image": uploaded_image,
            },
            format="multipart",
        )

        self.assertEqual(response.status_code, 403)


    def test_upload_image_to_nonexistent_business(self):
        self.client.force_authenticate(user=self.business_user)

        image_file = BytesIO()

        image = Image.new(
            "RGB",
            (100, 100),
            color="white",
        )

        image.save(
            image_file,
            format="JPEG",
        )

        image_file.seek(0)

        uploaded_image = SimpleUploadedFile(
            "test.jpg",
            image_file.read(),
            content_type="image/jpeg",
        )

        response = self.client.post(
            reverse(
                "business-image-create",
                kwargs={"business_id": 9999},
            ),
            {
                "image": uploaded_image,
            },
            format="multipart",
        )

        self.assertEqual(response.status_code, 404)

    def test_business_owner_can_create_offer(self):
        self.client.force_authenticate(user=self.business_user)

        create_response = self.client.post(
            reverse("business-list-create"),
            {
                "name": "Test Homestay",
                "category": "hotel",
                "location": "Mandi",
            },
        )

        business_id = create_response.data["id"]

        response = self.client.post(
            reverse("offer-list-create"),
            {
                "business": business_id,
                "title": "10% Off",
                "description": "Get 10% off your stay.",
                "discount": "10%",
                "valid_from": "2026-09-01T00:00:00Z",
                "valid_until": "2026-12-31T23:59:59Z",
                "is_active": True,
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["business"], business_id)
        self.assertEqual(response.data["title"], "10% Off")

            
    def test_other_user_cannot_create_offer(self):
        self.client.force_authenticate(user=self.business_user)

        create_response = self.client.post(
            reverse("business-list-create"),
            {
                "name": "Test Homestay",
                "category": "hotel",
                "location": "Mandi",
            },
        )

        business_id = create_response.data["id"]

        self.client.force_authenticate(user=self.customer)

        response = self.client.post(
            reverse("offer-list-create"),
            {
                "business": business_id,
                "title": "10% Off",
                "description": "Get 10% off your stay.",
                "discount": "10%",
                "valid_from": "2026-09-01T00:00:00Z",
                "valid_until": "2026-12-31T23:59:59Z",
                "is_active": True,
            },
            format="json",
        )

        self.assertEqual(response.status_code, 403)

    def test_create_offer_for_nonexistent_business(self):
        self.client.force_authenticate(user=self.business_user)

        response = self.client.post(
            reverse("offer-list-create"),
            {
                "business": 9999,
                "title": "10% Off",
                "description": "Get 10% off your stay.",
                "discount": "10%",
                "valid_from": "2026-09-01T00:00:00Z",
                "valid_until": "2026-12-31T23:59:59Z",
                "is_active": True,
            },
            format="json",
        )

        self.assertEqual(response.status_code, 404)

    def test_offer_list_is_public(self):
        self.client.force_authenticate(user=self.business_user)

        create_business_response = self.client.post(
            reverse("business-list-create"),
            {
                "name": "Test Homestay",
                "category": "hotel",
                "location": "Mandi",
            },
        )

        business_id = create_business_response.data["id"]

        self.client.post(
            reverse("offer-list-create"),
            {
                "business": business_id,
                "title": "10% Off",
                "description": "Get 10% off your stay.",
                "discount": "10%",
                "valid_from": "2026-09-01T00:00:00Z",
                "valid_until": "2026-12-31T23:59:59Z",
                "is_active": True,
            },
            format="json",
        )

        self.client.force_authenticate(user=None)

        response = self.client.get(
            reverse("offer-list-create"),
            {"business": business_id},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "10% Off")


    def test_offer_filter_by_business(self):
        self.client.force_authenticate(user=self.business_user)

        business_1_response = self.client.post(
            reverse("business-list-create"),
            {
                "name": "Homestay One",
                "category": "hotel",
                "location": "Mandi",
            },
        )

        business_2_response = self.client.post(
            reverse("business-list-create"),
            {
                "name": "Homestay Two",
                "category": "hotel",
                "location": "Shimla",
            },
        )

        business_1_id = business_1_response.data["id"]
        business_2_id = business_2_response.data["id"]

        self.client.post(
            reverse("offer-list-create"),
            {
                "business": business_1_id,
                "title": "Offer One",
                "discount": "10%",
                "valid_from": "2026-09-01T00:00:00Z",
                "valid_until": "2026-12-31T23:59:59Z",
                "is_active": True,
            },
            format="json",
        )

        self.client.post(
            reverse("offer-list-create"),
            {
                "business": business_2_id,
                "title": "Offer Two",
                "discount": "20%",
                "valid_from": "2026-09-01T00:00:00Z",
                "valid_until": "2026-12-31T23:59:59Z",
                "is_active": True,
            },
            format="json",
        )

        self.client.force_authenticate(user=None)

        response = self.client.get(
            reverse("offer-list-create"),
            {"business": business_1_id},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "Offer One")

    def test_business_detail_includes_images_and_offers(self):
        self.client.force_authenticate(user=self.business_user)

        create_response = self.client.post(
            reverse("business-list-create"),
            {
                "name": "Test Homestay",
                "category": "hotel",
                "location": "Mandi",
            },
        )

        business_id = create_response.data["id"]

        image_file = BytesIO()

        image = Image.new(
            "RGB",
            (100, 100),
            color="white",
        )

        image.save(
            image_file,
            format="JPEG",
        )

        image_file.seek(0)

        uploaded_image = SimpleUploadedFile(
            "test.jpg",
            image_file.read(),
            content_type="image/jpeg",
        )

        self.client.post(
            reverse(
                "business-image-create",
                kwargs={"business_id": business_id},
            ),
            {
                "image": uploaded_image,
            },
            format="multipart",
        )

        self.client.post(
            reverse("offer-list-create"),
            {
                "business": business_id,
                "title": "10% Off",
                "description": "Get 10% off your stay.",
                "discount": "10%",
                "valid_from": "2026-09-01T00:00:00Z",
                "valid_until": "2026-12-31T23:59:59Z",
                "is_active": True,
            },
            format="json",
        )

        self.client.force_authenticate(user=None)

        response = self.client.get(
            reverse(
                "business-detail",
                kwargs={"pk": business_id},
            )
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["images"]), 1)
        self.assertEqual(len(response.data["offers"]), 1)
        self.assertEqual(response.data["offers"][0]["title"], "10% Off")



    def test_other_user_cannot_delete_business(self):
        self.client.force_authenticate(user=self.business_user)

        create_response = self.client.post(
            reverse("business-list-create"),
            {
                "name": "Test Homestay",
                "category": "hotel",
                "location": "Mandi",
            },
        )

        business_id = create_response.data["id"]

        self.client.force_authenticate(user=self.customer)

        response = self.client.delete(
            reverse(
                "business-detail",
                kwargs={"pk": business_id},
            )
        )

        self.assertEqual(response.status_code, 403)


    def test_business_owner_can_delete_business(self):
        self.client.force_authenticate(user=self.business_user)

        create_response = self.client.post(
            reverse("business-list-create"),
            {
                "name": "Test Homestay",
                "category": "hotel",
                "location": "Mandi",
            },
        )

        business_id = create_response.data["id"]

        response = self.client.delete(
            reverse(
                "business-detail",
                kwargs={"pk": business_id},
            )
        )

        self.assertEqual(response.status_code, 204)

        detail_response = self.client.get(
            reverse(
                "business-detail",
                kwargs={"pk": business_id},
            )
        )

        self.assertEqual(detail_response.status_code, 404)