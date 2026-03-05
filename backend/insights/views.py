from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Insight
from .serializers import InsightSerializer

@api_view(["GET"])
def insights_api(request):
    queryset = Insight.objects.all()

    # Dictionary mapping filter keys to their lookup types
    # topics uses __icontains for partial matching
    filter_keys = [
        "end_year", "sector", "region", "country", 
        "city", "pest", "source", "swot"
    ]

    # Apply standard filters
    for key in filter_keys:
        val = request.GET.get(key)
        if val:
            queryset = queryset.filter(**{key: val})

    # Special handling for topics (partial match)
    topics_val = request.GET.get("topics")
    if topics_val:
        queryset = queryset.filter(topics__icontains=topics_val)

    serializer = InsightSerializer(queryset, many=True)
    return Response(serializer.data)