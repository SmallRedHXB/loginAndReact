from django.utils.deprecation import MiddlewareMixin
import time


class DisableCsrfCheck(MiddlewareMixin):

    @staticmethod
    def process_request(req):
        attr = '_dont_enforce_csrf_checks'
        if not getattr(req, attr, False):
            setattr(req, attr, True)

