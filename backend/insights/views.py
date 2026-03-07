from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Insight
from .serializers import InsightSerializer

@api_view(["GET"])
def insights_api(request):
    queryset = Insight.objects.all()

    # Define all possible filter keys
    filter_keys = [
        "end_year", "topics", "sector", "region", 
        "country", "city", "pest", "source", "swot"
    ]

    # Dynamically build the filter dictionary
    # Only include the key if the value exists in the request
    query_filters = {}
    for key in filter_keys:
        value = request.GET.get(key)
        if value:
            # Using __iexact ensures 'healthcare' matches 'Healthcare'
            query_filters[f"{key}__iexact"] = value

    # Apply all filters at once
    if query_filters:
        queryset = queryset.filter(**query_filters)

    serializer = InsightSerializer(queryset, many=True)
    return Response(serializer.data)