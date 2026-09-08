from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from django.shortcuts import get_object_or_404

from .models import Business, Offer
from .permissions import (
    IsBusinessAccount,
    IsOfferOwnerOrReadOnly,
    IsOwnerOrReadOnly,
)
from .serializers import (
    BusinessImageSerializer,
    BusinessSerializer,
    OfferSerializer,
)


class BusinessListCreateView(generics.ListCreateAPIView):

    queryset = Business.objects.all()

    serializer_class = BusinessSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsBusinessAccount()]

        return []

    def get_queryset(self):
        queryset = Business.objects.all()

        category = self.request.query_params.get("category")
        location = self.request.query_params.get("location")
        search = self.request.query_params.get("search")

        if category:
            queryset = queryset.filter(category=category)

        if location:
            queryset = queryset.filter(location__icontains=location)

        if search:
            queryset = queryset.filter(
                name__icontains=search
            )

        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class BusinessDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Business.objects.all()

    serializer_class = BusinessSerializer

    permission_classes = [IsOwnerOrReadOnly]


class CategoryListView(APIView):

    def get(self, request):
        categories = [
            {
                "value": value,
                "label": label,
            }
            for value, label in Business.CATEGORY_CHOICES
        ]

        return Response(categories)


class BusinessImageCreateView(generics.CreateAPIView):

    serializer_class = BusinessImageSerializer

    def perform_create(self, serializer):
        business_id = self.kwargs["business_id"]

        business = get_object_or_404(
            Business,
            id=business_id,
        )

        if business.owner != self.request.user:
            from rest_framework.exceptions import PermissionDenied

            raise PermissionDenied(
                "You can only upload images to your own business."
            )

        serializer.save(business=business)


class OfferListCreateView(generics.ListCreateAPIView):

    serializer_class = OfferSerializer

    def get_permissions(self):
        # Creating offers requires a business account.
        if self.request.method == "POST":
            return [IsBusinessAccount()]

        # Owner dashboard can request all of its own offers,
        # including inactive offers.
        if self.request.method == "GET":
            mine = self.request.query_params.get("mine")

            if mine == "true":
                return [IsBusinessAccount()]

        # Public GET remains open.
        return []

    def get_queryset(self):
        business_id = self.request.query_params.get("business")
        mine = self.request.query_params.get("mine")

        # Business owner dashboard:
        # return ALL offers belonging to the logged-in owner's businesses.
        if mine == "true":
            queryset = Offer.objects.filter(
                business__owner=self.request.user
            )

            if business_id:
                queryset = queryset.filter(
                    business_id=business_id
                )

            return queryset

        # Public users should only see active offers.
        queryset = Offer.objects.filter(
            is_active=True
        )

        if business_id:
            queryset = queryset.filter(
                business_id=business_id
            )

        return queryset

    def perform_create(self, serializer):
        business_id = self.request.data.get("business")

        business = get_object_or_404(
            Business,
            id=business_id,
        )

        if business.owner != self.request.user:
            from rest_framework.exceptions import PermissionDenied

            raise PermissionDenied(
                "You can only create offers for your own business."
            )

        serializer.save(business=business)

class OfferDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Offer.objects.all()

    serializer_class = OfferSerializer

    permission_classes = [IsOfferOwnerOrReadOnly]