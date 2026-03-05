from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Insight
from .serializers import InsightSerializer


@api_view(["GET"])
def insights_api(request):

    queryset = Insight.objects.all()

    filters = {
        "end_year": request.GET.get("end_year"),
        "topics": request.GET.get("topics"),
        "sector": request.GET.get("sector"),
        "region": request.GET.get("region"),
        "country": request.GET.get("country"),
        "city": request.GET.get("city"),
        "pest": request.GET.get("pest"),
        "source": request.GET.get("source"),
        "swot": request.GET.get("swot"),
    }

    for key, value in filters.items():
        if value:
            queryset = queryset.filter(**{key: value})

    serializer = InsightSerializer(queryset, many=True)

    return Response(serializer.data)