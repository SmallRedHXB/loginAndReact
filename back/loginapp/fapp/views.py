from rest_framework.viewsets import ModelViewSet
from .serializers import UserSerializer, User
from rest_framework.decorators import action
from django.contrib.auth import login
from rest_framework.response import Response


class UserViewset(ModelViewSet):
    '''
    用户类，用于登录注册
    '''
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @action(methods=['POST'], url_path='login', detail=False)
    def login(self, request):
        '''
        登录
        :param request: 用于传参数，必要参数 username：用户名   password：密码
        :return:
        '''
        username = request.data.get('username')
        pwd = request.data.get('password')

        res = {
            'code': 0,
            'msg': '',
            'data': {}
        }
        if not all([username, pwd]):
            res['msg'] = '参数异常。'
            return Response(res)
        print(request.data)
        try:
            user = User.objects.get(username=username, password=pwd)
        except:
            res['msg'] = '用户名或者密码错误，请重新登陆。'
            return Response(res)
        if user.is_active != 1:
            res['msg'] = '用户不可用，请重新登陆。'
            return Response(res)

        login(request, user)
        request.session['login'] = True
        request.session['FS_YWPT'] = True
        request.session.set_expiry(0)
        res['msg'] = '登陆成功'
        res['code'] = 1
        res['data'] = {'username': username}
        return Response(res)

    @action(methods=['POST'], url_path='register', detail=False)
    def register(self, request):
        '''
        注册
        :param request: 用于传参数，必要参数 email：邮箱   password：密码  username：用户名  residence：地区  website：暂时没啥用
        :return:
        '''
        email = request.data.get('email')
        password = request.data.get('password')
        username = request.data.get('username')
        residence = request.data.get('residence')
        website = request.data.get('website')
        res = {
            'code': 0,
            'msg': '',
            'data': {}
        }

        if not all([email, password, username, residence, website]):
            res['msg'] = '参数异常。'
            return Response(res)

        print([email, password, username, residence, website])
        if User.objects.filter(username=username):
            res['msg'] = '用户已存在。'
            return Response(res)

        User.objects.create(password=password, is_superuser=0, username=username, email=email)
        res['code'] = 1
        res['data'] = [email, password, username, residence, website]
        return Response(res)


