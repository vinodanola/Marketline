/**
/**
 * @author vdp
 * created on 2019
 */

(function () {
    'use strict';
    
    angular.module('App.ProspekRincianAngsuran',[])
        .config(function($stateProvider,$urlRouterProvider) {
            $stateProvider
                .state('prospek.aplikasi.rincianangsuran', {
                    url: '/aplikasi-rincian-angsuran',
                    templateUrl: 'partials/prospek-rincian-angsuran.html?UNIQID='+Math.random(),
                    controller: 'prospekRincianAngsuranCtrl',
                    data: {
                        pageTitle: 'Rincian Angsuran'
                    }
                })
                .state('prospek.aplikasi.angsuran.baru',{
                    url: '/baru',
                    templateUrl: 'partials/survey/rincian-angsuran-baru.html?UNIQID='+Math.random(),
                    controller: 'prospekRincianAngsuranBaruCtrl',
                    data: {
                        pageTitle: 'Rincian Angsuran Baru'
                    }
                })

                .state('prospek.aplikasi.angsuran.topupsyariah',{
                    url: '/topup-syariah',
                    templateUrl: 'partials/survey/rincian-angsuran-topup-syariah.html?UNIQID='+Math.random(),
                    controller: 'prospekRincianAngsuranTopUpSyariahCtrl',
                    data: {
                        pageTitle: 'Rincian Angsuran Top Up Syariah'
                    }
                })

                .state('prospek.aplikasi.angsuran.3r',{
                    url: '/3r',
                    templateUrl: 'partials/survey/rincian-angsuran-3r.html?UNIQID='+Math.random(),
                    controller: 'prospekRincianAngsuran3RCtrl',
                    data: {
                        pageTitle: 'Rincian Angusuran 3R'
                    }
                })

                .state('prospek.aplikasi.angsuran.3rsyariah',{
                    url: '/3r-syariah',
                    templateUrl: 'partials/survey/rincian-angsuran-3r-syariah.html?UNIQID='+Math.random(),
                    controller: 'prospekRincianAngsuran3RSyariahCtrl',
                    data: {
                        pageTitle: 'Rincian Angusuran 3R Syariah'
                    }
                });
        })

        .controller('prospekRincianAngsuranCtrl',function($scope,$state,$rootScope){
            
            console.log('MS_JENIS_PEMBIAYAAN_ID',$scope.formDataAplikasi.MS_JENIS_PEMBIAYAAN_ID);

            if ($scope.formDataAplikasi.MS_JENIS_PEMBIAYAAN_ID == 111 && $rootScope.$storage.SESSION_LOGIN.BUSINESS_TYPE == 'SY') {
                $state.go('prospek.aplikasi.angsuran.3rsyariah');
            } else if ($scope.formDataAplikasi.MS_JENIS_PEMBIAYAAN_ID == 111){
                $state.go('prospek.aplikasi.angsuran.3r');
            } else if ($scope.formDataAplikasi.MS_JENIS_PEMBIAYAAN_ID == 110 && $rootScope.$storage.SESSION_LOGIN.BUSINESS_TYPE == 'SY') {
                $state.go('prospek.aplikasi.angsuran.topupsyariah');
            } else {
                $state.go('prospek.aplikasi.angsuran.baru');
            }

            console.log('MS_JENIS_PEMBIAYAAN_ID',$scope.formDataAplikasi.MS_JENIS_PEMBIAYAAN_ID);

        });
        
        
})();


