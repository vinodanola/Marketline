/* ==================================================================================
 * ################################ PORTOFOLIO CONTROLLER ################################
 * ==================================================================================*/

App.controller('portofolioListCtrl', function (apiData, $scope, apiBase, $stateParams, $sessionStorage,globalFunction,$rootScope) {
	
	$scope.fdPL = {};
    $scope.listDEBITUR = [];
    $scope.fdPL.PAGE = 1;
    $scope.fdPL.MAX_SIZE = 5;
    $scope.fdPL.LIMIT = 10;
	$scope.reportHistory = [];	
	$scope.cuPN = {};

    if ($rootScope.$storage.SESSION_LOGIN.WILAYAH)
        $scope.fdPL.MS_WILAYAH_ID = $rootScope.$storage.SESSION_LOGIN.WILAYAH;
    if ($rootScope.$storage.SESSION_LOGIN.CABANG_KODE)
        $scope.fdPL.MS_KODE_CABANG = $rootScope.$storage.SESSION_LOGIN.CABANG_KODE;
    if ($rootScope.$storage.SESSION_LOGIN.UNIT_KODE)
        $scope.fdPL.MS_KODE_UNIT = $rootScope.$storage.SESSION_LOGIN.UNIT_KODE;
    
    apiData.kantorSet({
        scope   : $scope,
        fd      : 'fdPL'
    });	
    
    apiData.kantorExe($scope);	
	
    $scope.getlistDEBITUR = function (d) {
        var p = '';
                   			
		p = $rootScope.$storage.SESSION_LOGIN.POSISI_NAMA=='AOM' ? 'ID_SDM=' + $rootScope.$storage.SESSION_LOGIN.ID_SDM : 'ID_SDM=';
					
		if (d['MS_KODE_CABANG'])
            p += '&MS_KODE_CABANG=' + d['MS_KODE_CABANG'];
        if (d['MS_KODE_UNIT'])
            p += '&MS_KODE_UNIT=' + d['MS_KODE_UNIT'];
        if (d['PAGE'])
            p +='&PAGE='+d['PAGE'];
        if (d['LIMIT'])
            p +='&LIMIT='+d['LIMIT'];
        if (d['SEARCH'])
            p +='&SEARCH='+d['SEARCH'];		
		
		apiData.get({
			gl: false,
			api: apiBase + 'Portofolio/get_list/?' + p,
			scope: $scope,
			sn: 'listDEBITUR',
			type: 'tolist',
			callbacksuccess: function (R) {
				$scope.listDEBITUR = R.data.content;
				$scope.fdPL.TOTAL_ITEMS = R.data.len;
				console.log('data portofolio',R.data);
			}
		});
    };
	
    $scope.$watchGroup(['fdPL.MS_WILAYAH_ID', 'fdPL.MS_KODE_CABANG', 'fdPL.MS_KODE_UNIT','fdPL.PAGE','fdPL.LIMIT','fdPL.SEARCH'], function (newValues, oldValues, scope) {
        if (newValues) {
            $scope.getlistDEBITUR({          								
				'MS_KODE_CABANG'    : typeof ($scope.fdPL.MS_KODE_CABANG)!='undefined' ? $scope.fdPL.MS_KODE_CABANG : '',
                'MS_KODE_UNIT'      : typeof ($scope.fdPL.MS_KODE_UNIT)!='undefined' ? $scope.fdPL.MS_KODE_UNIT : '',
                'PAGE'              : typeof ($scope.fdPL.PAGE)!='undefined' ? $scope.fdPL.PAGE : '',
                'LIMIT'             : typeof ($scope.fdPL.LIMIT)!='undefined' ? $scope.fdPL.LIMIT : '',
                'SEARCH'            : typeof ($scope.fdPL.SEARCH)!='undefined' ? $scope.fdPL.SEARCH : ''				
            });			
			
			$scope.getCountAOM(typeof ($scope.fdPL.MS_KODE_UNIT)!='undefined' ? $scope.fdPL.MS_KODE_UNIT : '');
        }
    });  
	
	
	$scope.getCountAOM = function (kode_unit) {			
		apiData.get({
            gl      : true,
            api     : apiBase + 'Portofolio/get_count_aom?ID_SDM=' + $rootScope.$storage.SESSION_LOGIN.ID_SDM+'&MS_KODE_UNIT='+kode_unit,
            scope   : $scope,
            sn      : 'cuPN',
			callbacksuccess: function (R) {               
				console.log('data par npl unit',R.data);
				$scope.cuPN = R.data;
            }
        });
	};	
	
});
