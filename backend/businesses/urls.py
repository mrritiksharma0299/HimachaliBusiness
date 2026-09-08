
from django.urls import path

from .views import (
    BusinessDetailView,
    BusinessImageCreateView,
    BusinessListCreateView,
    CategoryListView,
    OfferDetailView,
    OfferListCreateView,
)


urlpatterns = [
    path(
        "",
        BusinessListCreateView.as_view(),
        name="business-list-create",
    ),

    path(
        "categories/",
        CategoryListView.as_view(),
        name="category-list",
    ),

    path(
        "offers/",
        OfferListCreateView.as_view(),
        name="offer-list-create",
    ),

    path(
        "offers/<int:pk>/",
        OfferDetailView.as_view(),
        name="offer-detail",
    ),

    path(
        "<int:business_id>/images/",
        BusinessImageCreateView.as_view(),
        name="business-image-create",
    ),

    path(
        "<int:pk>/",
        BusinessDetailView.as_view(),
        name="business-detail",
    ),
]
