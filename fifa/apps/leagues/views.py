from django.views.generic import ListView, DetailView

from .models import League


class LeagueList(ListView):
    model = League
    paginate_by = 50


class LeagueDetail(DetailView):
    model = League