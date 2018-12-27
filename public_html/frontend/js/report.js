/* ==================================================================================
 * ################################ REPORT CONTROLLER ################################
 * ==================================================================================*/

App.controller('reportNasabahCtrl', function (apiData, $scope, apiBase, $stateParams, $sessionStorage,globalFunction,$rootScope) {
	
	$scope.fdPL = {};
    $scope.listDEBITUR = [];
    $scope.fdPL.PAGE = 1;
    $scope.fdPL.MAX_SIZE = 5;
    $scope.fdPL.LIMIT = 10;
	$scope.reportHistory = [];

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
        if (d['MS_WILAYAH_ID'])
            p += 'MS_WILAYAH_ID=' + d['MS_WILAYAH_ID'];
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

		console.log('list report',p);
        apiData.get({
            gl: false,
            api: apiBase + 'report/get_list/?' + p,
            scope: $scope,
            sn: 'listDEBITUR',
            type: 'tolist',
            callbacksuccess: function (R) {
                //$scope.fdPL.TOTAL_ITEMS = $scope.listDEBITUR.length;
                $scope.listDEBITUR = R.data.content;
                $scope.fdPL.TOTAL_ITEMS = R.data.len;
				$scope.fdPL.MS_UNIT_KODE = R.data.MS_KODE_UNIT
            }
        });
    };
	
    $scope.$watchGroup(['fdPL.MS_WILAYAH_ID', 'fdPL.MS_KODE_CABANG', 'fdPL.MS_KODE_UNIT','fdPL.PAGE','fdPL.LIMIT','fdPL.SEARCH'], function (newValues, oldValues, scope) {
        if (newValues) {
            $scope.getlistDEBITUR({          				
				'MS_WILAYAH_ID'     : typeof ($scope.fdPL.MS_WILAYAH_ID)!='undefined' ? $scope.fdPL.MS_WILAYAH_ID : '',
                'MS_KODE_CABANG'    : typeof ($scope.fdPL.MS_KODE_CABANG)!='undefined' ? $scope.fdPL.MS_KODE_CABANG : '',
                'MS_KODE_UNIT'      : typeof ($scope.fdPL.MS_KODE_UNIT)!='undefined' ? $scope.fdPL.MS_KODE_UNIT : '',
                'PAGE'              : typeof ($scope.fdPL.PAGE)!='undefined' ? $scope.fdPL.PAGE : '',
                'LIMIT'             : typeof ($scope.fdPL.LIMIT)!='undefined' ? $scope.fdPL.LIMIT : '',
                'SEARCH'            : typeof ($scope.fdPL.SEARCH)!='undefined' ? $scope.fdPL.SEARCH : ''				
            });
        }
    });
    
    $scope.modalRPT = function (prospekid) { 
        
        $rootScope.namaREPORT = document.getElementById('reportnya' + prospekid).value;				
		
		if ($rootScope.namaREPORT == 'SP3U'){
			$rootScope.PROSPEK_ID = prospekid;
			var m = globalFunction.openModal('partials/modals/modal-report-note-sp3u.html', 'modal-report modal-form', 'modalReportSp3uCtrl');           
		}else{		
			var m = globalFunction.openModal('partials/modals/modal-report.html', 'modal-report modal-form', 'modalReportCtrl');           
		}
		
		$rootScope.modalReport = m;

        $rootScope.closemodalRPT = function () {
            m.close();
        };

    };    
});

App.controller('modalReportCtrl', function ($sce, $rootScope, $scope, $stateParams, apiData, apiBase, $sessionStorage, jasperBase) {   
         
    $scope.URL = jasperBase+$rootScope.namaREPORT+'.html?DB_PROSPEK_ID='+$rootScope.PROSPEK_ID;	

    $scope.trustedUrl = $sce.trustAsResourceUrl($scope.URL);

    $rootScope.progressbar.start();

    window.afterload = function (){
        $rootScope.progressbar.complete();   
        $scope.hideloading = 'hide';
        console.log($scope.hideloading);
    };

    $scope.titleREPORT = $rootScope.namaREPORT.charAt(0).toUpperCase()+$rootScope.namaREPORT.substr(1).toLowerCase();   

    $scope.save = function (ext) {

        window.location = jasperBase+$rootScope.namaREPORT+ext+'?DB_PROSPEK_ID=' +$rootScope.PROSPEK_ID;

        $scope.reportHistory = {			
            REPORT_NAME: $rootScope.namaREPORT,
            DB_PROSPEK_ID: $rootScope.PROSPEK_ID,
            USERID: $sessionStorage.SESSION_LOGIN.USERNAME,
            USERNAME: $sessionStorage.SESSION_LOGIN.NAMA
        };

        console.log($scope.reportHistory);
        apiData.post({
            gl: true,
            api: apiBase + 'report/post_history',
            data: $scope.reportHistory,
            scope: $scope,
            callbacksuccess: function () {}
        });
    };
});


App.controller('modalReportSp3uCtrl', function ($sce, $rootScope, $scope, $stateParams, apiData, apiBase, $sessionStorage, jasperBase, globalFunction) {   

	$rootScope.RPT=[];
	
	apiData.get({
		gl      : false,
		api     : apiBase+'report/get_note_sp3u/'+$rootScope.PROSPEK_ID,
		scope   : $scope,
		sn      : 'RPT',
		type    : 'object',
		callbacksuccess : function(d){					
			$rootScope.RPT.covenant = d.data.content;			
		}
	});
	
	
	$rootScope.viewModalRPT_SP3U = function () {
		var m = globalFunction.openModal('partials/modals/modal-report.html', 'modal-report modal-form', 'modalReportCtrl');           		
		console.log('modalRPT_SP3U',$rootScope.namaREPORT);	
		
		$rootScope.modalReport.close();
		
		$rootScope.modalReport = m;
	}
         
	$rootScope.simpanModalRPT_SP3U = function () {
		
		$scope.reportHistory = {
            REPORT_NAME: $rootScope.namaREPORT,
            DB_PROSPEK_ID: $rootScope.PROSPEK_ID,
            USERID: $sessionStorage.SESSION_LOGIN.USERNAME,
            USERNAME: $sessionStorage.SESSION_LOGIN.NAMA,
			COVENANT : $rootScope.RPT.covenant
        };		
		
		console.log('COVENANT',$scope.RPT.covenant);
		
        apiData.post({
            gl: true,
            api: apiBase + 'report/set_note_sp3u',
            data: $scope.reportHistory,
            scope: $scope,
            callbacksuccess: function () {}
        });		
			
    };	 				
		
	$rootScope.closemodalRPT = function () {
		$rootScope.modalReport.close();
	};	
});


App.controller('reportSalesActivityCtrl', function ($sce, apiData, $scope, apiBase, $stateParams, $sessionStorage,globalFunction,$rootScope,jasperBase) {
	
	// console.log($rootScope.jns_pembiayaan);
	
	$scope.PreviewSalesActivity = function (rpt,pngjuan,awal,akhir,ext) {			
		console.log(rpt,pngjuan,awal,akhir);		
		var nama_report,tipe_report,nama_tipe_report,tipe;
							
		switch ($sessionStorage.SESSION_LOGIN.POSISI_NAMA){
			case 'AOM':
				tipe='AOM';
				tipe_report='NAMA_AOM';
				nama_tipe_report=$sessionStorage.SESSION_LOGIN.ID_SDM;				
				break;
			case 'KKU':
				tipe='UNIT';
				tipe_report='UNIT';
				nama_tipe_report=$sessionStorage.SESSION_LOGIN.UNIT_KODE;
				break;
			case 'BISNIS':
				tipe='CABANG';
				tipe_report='NAMA_CABANG';
				nama_tipe_report=$sessionStorage.SESSION_LOGIN.CABANG_KODE;
				break;				
		}	

		switch (rpt){
			case 'Sales Activity Bulanan':
				nama_report=tipe+'_SalesActivityBulanan';
				break;
			case 'Plafond Proposal Approval':
				nama_report=tipe+'_SalesActivityPlafond';
				break;				
		}			
		
		awal = moment(awal).format('YYYY-MM-DD');
		akhir = moment(akhir).format('YYYY-MM-DD');
		
		console.log(awal,akhir);				
		
		$scope.URL = jasperBase+'SalesActivity/'+nama_report+'.'+ext+'?NAMA='+nama_tipe_report+'&END_DATE='+akhir+'&START_DATE='+awal+'&JENIS_PENGAJUAN='+pngjuan;
		
		console.log($scope.URL);

		$scope.trustedUrl = $sce.trustAsResourceUrl($scope.URL);
		
		console.log($scope.trustedUrl);
		
	}		
	
});