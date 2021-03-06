import os
from django.conf import settings
from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from fifa.apps.views import PlayerJSONList

admin.autodiscover()

urlpatterns = patterns(
    '',
    url(
        r'^$',
        TemplateView.as_view(template_name='base.html'),
        name='homepage'
    ),
    url(r'^admin/', include(admin.site.urls)),

    # Clubs
    url(r'^clubs/', include('fifa.apps.clubs.urls', namespace='clubs')),

    # Leagues
    url(r'^leagues/', include('fifa.apps.leagues.urls', namespace='leagues')),

    # Nations
    url(r'^nations/', include('fifa.apps.nations.urls', namespace='nations')),

    # Players
    url(r'^players/', include('fifa.apps.players.urls', namespace='players')),

    # API
    url(r'^api/players/$', PlayerJSONList.as_view(), name="api"),

    url(r'^djangojs/', include('djangojs.urls')),
)

if settings.DEBUG:
    urlpatterns += patterns(
        '',
        url("^404/$", TemplateView.as_view(template_name="404.html")),
        url("^500/$", TemplateView.as_view(template_name="500.html")),
    ) + static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
    ) + static(
        settings.ASSET_URL, document_root=settings.ASSETFILES_ROOT
    ) + static(
        '/node_modules/', document_root=os.path.join(settings.BASE_DIR, 'node_modules')
    )
