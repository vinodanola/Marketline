//var myDateConfig = { timezone : 'Asia/Jakarta' };

Date.prototype.toISOString = function() {
    var tzoa = -this.getTimezoneOffset(),
        tzo = 420,
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            var norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    console.log('timezone',-this.getTimezoneOffset());
    return this.getFullYear() +
        '-' + pad(this.getMonth() + 1) +
        '-' + pad(this.getDate()) +
//        'T' + pad(this.getHours()) +
        'T' + pad('00') +
//        ':' + pad(this.getMinutes()) +
        ':' + pad('00') +
//        ':' + pad(this.getSeconds()) +
        ':' + pad('00') +
        dif + pad(tzo / 60) +
        ':' + pad(tzo % 60);
};

var App = angular.module('App', ['ngAnimate', 'ngMaterial' , 'angularMoment', 'ui.bootstrap', 'ui.router', 'wt.responsive', 'textAngular', 'ui.utils.masks', 'ngProgress', 'ngStorage', 'ngMask', 'treeControl', 'App.BTB', 'ui.select']);

App.config( function($stateProvider, $urlRouterProvider, $httpProvider, $provide, $mdDateLocaleProvider, $locationProvider) {
    
    /* BASE API */
        
    $provide.value("apiBase", "http://" + window.location.hostname + ':' + window.location.port + "/backend/");
    $provide.value("webServiceBase", "http://192.168.10.137/PNM/api/v1/");  
//    $provide.value("fileBase", "ftp://10.61.3.16/");
    $provide.value("fileBase", "http://" + window.location.hostname + ':' + window.location.port + "/backend/globalclass/get_file_alfresco/?NODE_ID=");
    $provide.value("jasperBase", "http://reportserver.pnm.co.id/jasperserver/rest_v2/reports/reports/MIS/");
    $provide.value("simapanBase", "http://10.61.3.49/simapan3.1/public/");
    
    /* ROUTE */
    
    $urlRouterProvider.when('/review/:id/analisa-sensitivitas/rcr-usulan-&-rcr-rekomendasi', '/review/:id/analisa-sensitivitas/rcr-usulan-&-rcr-rekomendasi/reviewer');
    
    $urlRouterProvider.when('/review/:id/analisa-sensitivitas/analisa-modal-kerja', '/review/:id/analisa-sensitivitas/analisa-modal-kerja/reviewer');
    
    $stateProvider
    
        /* APPS */
        .state('apps', {
            url: '/',
            templateUrl: 'partials/global/apps.html',
            controller: 'appsCtrl',
            data: {
                pageTitle: 'MarketLine'
            }
        })
    
        /* LOGIN */
        .state('login', {
            url: '/login',
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl',
            data: {
                pageTitle: 'Login'
            }
        })
    
        /* HOME */
        .state('home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            data: {
                pageTitle: 'Home'
            }
        })
        
        /* HOME (HOME2) */
        .state('home_', {
            url: '/home_',
            templateUrl: 'partials/home2.html',
            controller : 'home2Ctrl',
            data: {
                pageTitle: 'Home'
            }
        })
        
        /* ==================================================================================
         * ############################## USER MANAGEMENT STATE #############################
         * ==================================================================================*/
        
        .state('usermanagement', {
            url: '/user-management',
            templateUrl: 'partials/user_management/user-management.html',
//            controller: 'userManagementCtrl',
            data: {
                pageTitle: 'Manajemen Pengguna'
            }
        })
        
        .state('usermanagement.group', {
            url: '/group',
            templateUrl: 'partials/user_management/user-management-group.html',
//            controller: 'userManagementGroupCtrl',
            data: {
                pageTitle: 'Manajemen Pengguna - Group'
            }
        })
        
        .state('usermanagement.group.setting', {
            url: '/setting',
            templateUrl: 'partials/user_management/user-management-group-setting.html',
            controller: 'userManagementSettingCtrl',
            data: {
                pageTitle: 'Group - Setting'
            }
        })
        
        
        /* ==================================================================================
         * #################################### PROSPEK STATE ###############################
         * ==================================================================================*/
        
        .state('prospek', {
            url: '/prospek/:id',
            templateUrl: 'partials/prospek-index.html',
            controller: 'prospekCtrl',
            data: {
                pageTitle: 'Prospek'
            }
        })
        
        /* ============= PROSPEK DETAIL ============= */
        
        .state('identitasindividu.mandatory', {
            url: '/identitas-individu-mandatory',
            templateUrl: 'partials/prospek-mandatory.html',
            controller: 'prospekCreate'
        })
        .state('identitasindividu.kategori', {
            url: '/identitas-individu-kategori',
            templateUrl: 'partials/prospek-kategori.html'
        })
        
        /* =================== IDENTITAS INDIVIDU ====================== */
        
        .state('prospek.identitasindividu', {
            url: '/identitas-individu',
            templateUrl: 'partials/prospek.html',
            controller: 'identitasIndividuCtrl',
            data: {
                pageTitle: 'Identitas Individu'
            }
        })
        
        /* INFORMASI PRIBADI */
        
        .state('prospek.identitasindividu.informasipribadi', {
            url: '/identitas-individu-informasi-pribadi',
            templateUrl: 'partials/prospek-informasi-pribadi.html',
            data: {
                pageTitle: 'Informasi Pribadi'
            }
        })
        .state('prospek.identitasindividu.dokumenidentitas', {
            url: '/identitas-individu-dokumen-identitas',
            templateUrl: 'partials/prospek-dokumen-identitas.html',
            data: {
                pageTitle: 'Dokumen Identitas'
            }
        })
        .state('prospek.identitasindividu.kontak', {
            url: '/identitas-individu-kontak',
            templateUrl: 'partials/prospek-kontak2.html',
            controller: 'identitasIndividuKontakCtrl',
            data: {
                pageTitle: 'Kontak'
            }
        })
        .state('prospek.identitasindividu.referensi', {
            url: '/identitas-individu-referensi',
            templateUrl: 'partials/identitas-individu-referensi.html',
            data: {
                pageTitle: 'Referensi'
            }
        })
        
        /* ALAMAT */
        
        .state('prospek.identitasindividu.alamat', {
            url: '/identitas-individu-alamat',
            templateUrl: 'partials/prospek-alamat.html',
            controller: 'identitasIndividuAlamatCtrl',
            data: {
                pageTitle: 'Alamat'
            }
        })
        .state('prospek.identitasindividu.alamat.ktp', {
            url: '/identitas-individu-alamat-ktp',
            templateUrl: 'partials/prospek-alamat-ktp.html',
            params : {
                adrstype : 'ktp'
            }
        })
        .state('prospek.identitasindividu.alamat.domisili', {
            url: '/identitas-individu-alamat-domisili',
            templateUrl: 'partials/prospek-alamat-domisili.html',
            params : {
                adrstype : 'domisili'
            }
        })
        .state('prospek.identitasindividu.alamat.tempatusaha', {
            url: '/identitas-individu-alamat-tempat-usaha',
            templateUrl: 'partials/prospek-alamat-tempat-usaha.html',
            params : {
                adrstype : 'tempatusaha'
            }
        })
        
        /* STATUS PEKERJAAN */
        
        .state('prospek.identitasindividu.statuspekerjaan', {
            url: '/identitas-individu-status-pekerjaan',
            templateUrl: 'partials/prospek-status-pekerjaan.html',
            data: {
                pageTitle: 'Status Pekerjaan'
            }
        })
        .state('prospek.identitasindividu.pendidikan', {
            url: '/identitas-individu-pendidikan',
            templateUrl: 'partials/prospek-pendidikan.html',
            data: {
                pageTitle: 'Pendidikan'
            }
        })
        .state('prospek.identitasindividu.submit', {
            url: '/identitas-individu-submit',
            templateUrl: 'partials/prospek-submit.html'
        })
        
        /* LAINNYA */
        
        .state('prospek.identitasindividu.lainnya', {
            url: '/identitas-individu-lainnya',
            templateUrl: 'partials/prospek-identitas-individu-lainnya.html',
            controller : '',
            data: {
                pageTitle: 'Lainnya'
            }
        })
        
        /* KELUARGA */
        
        .state('prospek.keluarga', {
            url: '/keluarga',
            templateUrl: 'partials/keluarga.html',
            controller: 'keluargaCtrl'
        })
        .state('prospek.keluarga.data', {
            url: '/keluarga-data',
            templateUrl: 'partials/keluarga-data.html',
            controller: 'keluargaData',
            data: {
                pageTitle: 'Data Keluarga'
            }
        })
        .state('prospek.keluarga.hubungan', {
            url: '/keluarga-hubungan',
            templateUrl: 'partials/keluarga-hubungan.html'
        })
        .state('prospek.keluarga.hubunganlain', {
            url: '/keluarga-hubungan-lain',
            templateUrl: 'partials/keluarga-hubungan-lain.html',
        })
        .state('prospek.keluarga.detail', {
            url: '/keluarga-detail',
            templateUrl: 'partials/keluarga-detail.html',
            controller: 'keluargaDetailCtrl',
            data: {
                pageTitle: 'Detail Keluarga'
            }
        })
        
        /* APLIKASI */
        
        .state('prospek.aplikasi', {
            url: '/aplikasi',
            templateUrl: 'partials/aplikasi.html',
            controller: 'aplikasiCtrl',
            data: {
                pageTitle: 'Aplikasi'
            }
        })
        .state('prospek.aplikasi.informasipembiayaan', {
            url: '/aplikasi-informasi-pembiayaan',
            templateUrl: 'partials/aplikasi-informasi-pembiayaan.html',
            data: {
                pageTitle: 'Informsi Pembiayaan'
            }
        })
        .state('prospek.aplikasi.datapembiayaan', {
            url: '/aplikasi-data-pembiayaan',
            templateUrl: 'partials/aplikasi-data-pembiayaan.html',
            data: {
                pageTitle: 'Data Pembiayaan'
            }
        })
        .state('prospek.aplikasi.informasiusaha', {
            url: '/aplikasi-informasi-usaha',
            templateUrl: 'partials/aplikasi-informasi-usaha.html',
            controller: 'aplikasiInformasiUsahaCtrl',
            data: {
                pageTitle: 'Informasi Usaha'
            }
        })
        
        /* AGUNAN */
        
        .state('prospek.agunan', {
            url: '/agunan',
            templateUrl: 'partials/agunan.html',
            controller: 'agunanCtrl',
            data: {
                pageTitle: 'Rencana Agunan'
            }
        })
        
        /* DOKUMEN */
        
         .state('prospek.dokumen', {
            url: '/dokumen',
            templateUrl: 'partials/dokumen.html',
            controller: 'dokumenCtrl',
            data: {
                pageTitle: 'Dokumen'
            }
        })
        
        /* AOM */
        
        .state('prospek.aom', {
            url: '/aom',
            templateUrl: 'partials/aom.html',
            data: {
                pageTitle: 'AOM'
            }
        })
        
        .state('prospek.aom.info', {
            url: '/info',
            templateUrl: 'partials/aom-info.html',
            controller: 'aomInfoCtrl',
            data: {
                pageTitle: 'Informasi AOM'
            }
        })
        
        .state('prospek.aom.kunjungan', {
            url: '/kunjungan',
            templateUrl: 'partials/aom-kunjungan.html',
            controller: 'aomKunjunganCtrl',
            data: {
                pageTitle: 'Kunjungan AOM'
            }
        })
        		
		/* Penjamin FZL 6/4/2018 */ 
		
		.state('prospek.penjamin',{
            url: '/penjamin',
            templateUrl: 'partials/penjamin.html',
            controller: 'penjaminCtrl',
            data: {
                pageTitle: 'Penjamin'
            }
        })
        					
        /* Cek SID */
        
        .state('prospek.ceksid', {
            url: '/cek-sid',
            templateUrl: 'partials/cek-sid.html',
            controller: 'cekSIDCtrl',
            data: {
                pageTitle: 'Cek SLIK'
            }
        })
        
        /* One Obligor */
        
        .state('prospek.oneobligor', {
            url: '/one-obligor',
            templateUrl: 'partials/one-obligor.html',
            controller: 'oneObligorCtrl',
            data: {
                pageTitle: 'Cek One Obligor'
            }
        })
				
        /* =========== PROSPEK CREATE WIZARD ===========  */
        
        .state('prospekcreate', {
            url: '/prospek-create',
            templateUrl: 'partials/prospek-create.html',
            controller: 'prospekCreate',
            data: {
                pageTitle: 'Prospek Wizard'
            }
        })
        
        .state('prospekcreate.1', {
            url: '/1',
            templateUrl: 'partials/prospek-create-1.html',
            data: {
                pageTitle: 'Prospek Wizard - Step 1'
            }
            
        })
        
        .state('prospekcreate.2', {
            url: '/2',
            templateUrl: 'partials/prospek-create-2.html',
            data: {
                pageTitle: 'Prospek Wizard - Step 2'
            }
        })
        
        .state('prospekcreate.3', {
            url: '/3',
            templateUrl: 'partials/prospek-create-3.html',
            data: {
                pageTitle: 'Prospek Wizard - Step 3'
            }
        })
        
        /* =========== PROSPEK LIST =========== */
        .state('prospeklist', {
            url: '/prospek-list',
            templateUrl: 'partials/prospek-list.html',
            controller: 'prospekListCtrl',
            data: {
                pageTitle: 'Daftar Prospek'
            }
        })
        
        /* =========== CALON DEBITUR PROFILE =========== */
        .state('calondebiturprofile', {
            url: '/calon-debitur-profile/:id',
            templateUrl: 'partials/calon-debitur-profile_.html',
            controller: 'calonDebiturProfileCtrl',
            data: {
                pageTitle: 'Calon Debitur Profile'
            }
        })
        
        .state('calondebiturprofile.prospek', {
            url: '/prospek',
            templateUrl: 'partials/calon-debitur-prospek_.html',
            controller: '',
            data: {
                pageTitle: 'Calon Debitur Profile - Prospek'
            }
        })
        
        .state('calondebiturprofile.survey', {
            url: '/survey',
            templateUrl: 'partials/calon-debitur-survey_.html',
            controller: '',
            data: {
                pageTitle: 'Calon Debitur Profile - Survey'
            }
        })
        
        /* =========== PROSPEK KATEGORI =========== */
        
        .state('kategoriprospek', {
            url: '/kategori/:id',
            templateUrl: 'partials/kategori.html',
            controller: 'kategoriCtrl',
            data: {
                pageTitle: 'Kategori Prospek'
            }
        })
        
        
        /* ==================================================================================
         * #################################### SURVEY STATE ################################
         * ==================================================================================*/
        
        .state('survey',{
            url: '/survey/:id',
            templateUrl: 'partials/survey/survey.html',
            controller: 'surveyCtrl',
            data: {
                pageTitle: 'Survey'
            }
        })
        
        /* LIST SURVEY */
        
        .state('surveylist',{
            url: '/survey-list',
            templateUrl: 'partials/survey/survey-list.html',
            controller: 'listSurveyCtrl',
            data: {
                pageTitle: 'Daftar Survey'
            }
        })
        
        /* INFORMASI SURVEY */
        
        .state('survey.informasi',{
            url: '/informasi',
            templateUrl: 'partials/survey/informasi-survey.html',
            controller: 'informasiSurveyCtrl',
            data: {
                pageTitle: 'Informasi Survey'
            }
        })
        .state('survey.informasi.index',{
            url: '/index',
            templateUrl: 'partials/survey/informasi-survey-index.html',
            data: {
                pageTitle: 'Informasi Survey Index'
            }
        })
        .state('survey.informasi.alamat',{
            url: '/alamat',
            templateUrl: 'partials/survey/informasi-survey-alamat.html',
            controller: 'informasiSurveyAlamatCtrl',
            data: {
                pageTitle: 'Alamat'
            }
        })
        .state('survey.informasi.kunjunganusaha',{
            url: '/kunjungan-usaha',
            templateUrl: 'partials/survey/kunjungan-usaha.html',
            controller: 'informasiSurveyKunjunganUsahaCtrl',
            data: {
                pageTitle: 'Kunjungan Usaha'
            }
        })
        .state('survey.informasi.aom',{
            url: '/aom',
            templateUrl: 'partials/survey/aom.html',
            data: {
                pageTitle: 'Informasi AOM'
            }
        })
        
        /* PROFILE DAN KARAKTER */
        
        .state('survey.profilekarakter',{
            url: '/karakter',
            templateUrl: 'partials/survey/profile-dan-karakter.html',
            controller: 'profileDanKarakterSurveyCtrl',
            data: {
                pageTitle: 'Profile dan Karakter'
            }
        })
        
        .state('survey.profilekarakter.index',{
            url: '/index',
            templateUrl: 'partials/survey/profile-dan-karakter-index.html',
//            controller: 'profileDanKarakterSurveyCtrl',
            data: {
                pageTitle: 'Profile dan Karakter Index'
            }
        })
        
        .state('survey.profilekarakter.sumberinformasireputasi',{
            url: '/sumber-informasi-reputasi',
            templateUrl: 'partials/survey/sumber-informasi-reputasi.html',
            controller: 'pdkSumberInformasiReputasiCtrl',
            data: {
                pageTitle: 'Sumber Informasi Reputasi'
            }
        })
        
        .state('survey.profilekarakter.dokumenpembiayaan',{
            url: '/dokumen-pembiayaan',
            templateUrl: 'partials/survey/dokumen-pembiayaan.html',
            controller: 'pdkDokumenPembiayaanCtrl',
            data: {
                pageTitle: 'Dokumen Pembiayaan'
            }
        })
        
        .state('survey.profilekarakter.executivesummarycriticalcharacter',{
            url: '/executive-summary-critical-character',
            templateUrl: 'partials/survey/executive-summary-critical-character.html',
//            controller: 'profileDanKarakterSurveyCtrl',
            data: {
                pageTitle: 'Executive Summary Critical Character'
            }
        })
        
        /* KAPASITAS USAHA */
        
        .state('survey.kapasitasusaha',{
            url: '/kapasitas-usaha',
            templateUrl: 'partials/survey/kapasitas-usaha.html',
            controller: 'kapasitasUsahaSurveyCtrl',
            data: {
                pageTitle: 'Kapasitas Usaha'
            }
        })
        
        .state('survey.kapasitasusaha.index',{
            url: '/index',
            templateUrl: 'partials/survey/kapasitas-usaha-index.html',
            data: {
                pageTitle: 'Kapasitas Usaha Index'
            }
        })
        
        .state('survey.kapasitasusaha.aktivitasrekeningbank',{
            url: '/aktivitas-rekening-bank',
            templateUrl: 'partials/survey/aktivitas-rekening-bank.html',
            controller: 'kuAktifitasRekeningBankSurveyCtrl',
            data: {
                pageTitle: 'Aktivitas Rekening Bank'
            }
        })
        
        /* JENIS USAHA */
        
        .state('survey.jenisusaha',{
            url: '/jenis-usaha',
            templateUrl: 'partials/survey/jenis-usaha.html',
            controller: 'jenisUsahaSurveyCtrl',
            data: {
                pageTitle: 'Jenis Usaha'
            }
        })
        .state('survey.jenisusaha.index',{
            url: '/index',
            templateUrl: 'partials/survey/jenis-usaha-index.html',
            data: {
                pageTitle: 'Jenis Usaha Index'
            }
        })
        .state('survey.jenisusaha.alamat',{
            url: '/alamat',
            templateUrl: 'partials/survey/jenis-usaha-alamat.html',
            data: {
                pageTitle: 'Jenis Usaha Alamat'
            }
        })
        .state('survey.jenisusaha.detail',{
            url: '/detail',
            templateUrl: 'partials/survey/jenis-usaha-detail.html',
            data: {
                pageTitle: 'Jenis Usaha Detail'
            }
        })
        .state('survey.jenisusaha.list',{
            url: '/list',
            templateUrl: 'partials/survey/jenis-usaha-list.html',
            data: {
                pageTitle: 'Daftar Jenis Usaha'
            }
        })
        .state('survey.jenisusaha.pengelolaankeuangan',{
            url: '/pengelolaan-keuangan',
            templateUrl: 'partials/survey/pengelolaan-keuangan.html',
            data: {
                pageTitle: 'Pengelolaan Keuangan'
            }
        })
        
        /* KEUANGAN */
        
        .state('survey.keuangan',{
            url: '/keuangan',
            templateUrl: 'partials/survey/keuangan.html',
            controller: 'keuanganSurveyCtrl',
            data: {
                pageTitle: 'Keuangan'
            }
        })
        
        .state('survey.keuangan.index',{
            url: '/index',
            templateUrl: 'partials/survey/keuangan-index.html',
            data: {
                pageTitle: 'Keuangan Index'
            }
        })
        
        .state('survey.keuangan.datapinjaman',{
            url: '/data-pinjaman',
            templateUrl: 'partials/survey/data-pinjaman.html',
            data: {
                pageTitle: 'Data Pinjaman'
            }
        })
        
        .state('survey.keuangan.rincianpinjaman',{
            url: '/rincian-pinjaman',
            templateUrl: 'partials/survey/rincian-pinjaman.html',
            controller: 'rincianPinjamanSurveyCtrl',
            data: {
                pageTitle: 'Rincian Pinjaman'
            }
        })
        
        /* KEBUTUHAN MODAL KERJA */
        
        .state('survey.kebutuhanmodalkerja',{
            url: '/kebutuhan-modal-kerja',
            templateUrl: 'partials/survey/kebutuhan-modal-kerja.html',
            controller: 'kebutuhanModalKerjaCtrl',
            data: {
                pageTitle: 'Kebutuhan Modal Kerja'
            }
        })
        
        .state('survey.kebutuhanmodalkerja.index',{
            url: '/index',
            templateUrl: 'partials/survey/kebutuhan-modal-kerja-index.html',
            data: {
                pageTitle: 'Kebutuhan Modal Kerja Index'
            }
        })
        
        .state('survey.kebutuhanmodalkerja.aset',{
            url: '/aset',
            templateUrl: 'partials/survey/aset.html',
            controller: 'asetSurveyCtrl',
            data: {
                pageTitle: 'Aset'
            }
        })
        
        .state('survey.kebutuhanmodalkerja.rencanaanggaranbelanja',{
            url: '/rencana-anggaran-belanja',
            templateUrl: 'partials/survey/rencana-anggaran-belanja.html',
            controller: 'rabSurveyCtrl',
            data: {
                pageTitle: 'Rencana Anggaran Belanaja'
            }
        })
        
        .state('survey.kebutuhanmodalkerja.dokumenrencanaanggaranbelanja',{
            url: '/dokumen-rencana-anggaran-belanaja',
            templateUrl: 'partials/survey/dokumen-rencana-anggaran-belanja.html',
            controller: 'dokumenRabSurveyCtrl',
            data: {
                pageTitle: 'Dokumen Rencana Anggran Belanaja'
            }
        })
        
        .state('survey.kebutuhanmodalkerja.executivesummaryomset',{
            url: '/executive-summary-omset',
            templateUrl: 'partials/survey/executive-summary-omset.html',
            data: {
                pageTitle: 'Executive Summary Omset'
            }
        })
        
        /* KELUARGA */
        
        .state('survey.keluarga',{
            url: '/keluarga',
            templateUrl: 'partials/survey/keluarga.html',
            controller: 'keluargaSurveyCtrl',
            data: {
                pageTitle: 'Keluarga'
            }
        })
        
        .state('survey.keluarga.index',{
            url: '/index',
            templateUrl: 'partials/survey/keluarga-index.html',
            data: {
                pageTitle: 'Keluarga Index'
            }
        })
        
        .state('survey.keluarga.detail',{
            url: '/detail',
            templateUrl: 'partials/survey/keluarga-detail.html',
            controller: 'keluargaDetailSurveyCtrl',
            data: {
                pageTitle: 'Keluarga Detail'
            }
        })
        
        /* AGUNAN SURVEY */
        
        .state('survey.agunan',{
            url: '/agunan',
            templateUrl: 'partials/survey/agunan.html',
            controller: 'agunanSurveyCtrl',
            data: {
                pageTitle: 'Agunan'
            }
        })
        
        .state('survey.agunan.index',{
            url: '/index',
            templateUrl: 'partials/survey/agunan-index.html',
            data: {
                pageTitle: 'Agunan Index'
            }
        })
        
        .state('survey.agunan.tanahdanbangunan',{
            url: '/tanah-dan-bangunan',
            templateUrl: 'partials/survey/tanah-dan-bangunan.html',
            data: {
                pageTitle: 'Tanah dan Bangunan'
            }
        })
        
        .state('survey.agunan.ajb',{
            url: '/ajb',
            templateUrl: 'partials/survey/ajb.html',
            data: {
                pageTitle: 'AJB'
            }
        })
        
        .state('survey.agunan.alamat',{
            url: '/alamat',
            templateUrl: 'partials/survey/alamat-agunan.html',
            data: {
                pageTitle: 'Alamat Agunan'
            }
        })
        
        .state('survey.agunan.keadaantanahdanstatuspenghunian',{
            url: '/keadaan-tanah-dan-status-penghunian',
            templateUrl: 'partials/survey/keadaan-tanah-dan-status-penghunian.html',
            data: {
                pageTitle: 'Keadaan Tanah dan Status Penghunian'
            }
        })
        
        .state('survey.agunan.fasilitas',{
            url: '/fasilitas',
            templateUrl: 'partials/survey/fasilitas.html',
            data: {
                pageTitle: 'Fasilitas Agunan'
            }
        })
        
        .state('survey.agunan.keadaanbangunan',{
            url: '/keadaan-bangunan',
            templateUrl: 'partials/survey/keadaan-bangunan.html',
            data: {
                pageTitle: 'Keadaan Bangunan'
            }
        })
        
        .state('survey.agunan.konstruksibangunan',{
            url: '/konstruksi-bangunan',
            templateUrl: 'partials/survey/konstruksi-bangunan.html',
            data: {
                pageTitle: 'Konstruksi Bangunan'
            }
        })
        
        .state('survey.agunan.tataruang',{
            url: '/tata-ruang',
            templateUrl: 'partials/survey/tata-ruang.html',
            data: {
                pageTitle: 'Tata Ruang'
            }
        })
        
        .state('survey.agunan.penilaian',{
            url: '/penilaian',
            templateUrl: 'partials/survey/penilaian.html',
            data: {
                pageTitle: 'Penilaian'
            }
        })
        
        .state('survey.agunan.dokumen',{
            url: '/dokumen',
            templateUrl: 'partials/survey/dokumen-agunan.html',
            controller: 'dokumenAgunanCtrl',
            data: {
                pageTitle: 'Dokumen Agunan'
            }
        })
        
        .state('survey.agunan.list',{
            url: '/list',
            templateUrl: 'partials/survey/agunan-list.html',
            data: {
                pageTitle: 'Daftar Agunan'
            }
        })
        
        .state('survey.agunan.executivesummaryanalisaagunan',{
            url: '/executive-summary-analisa-agunan',
            templateUrl: 'partials/survey/executive-summary-analisa-agunan.html',
            controller: 'exsumAgunanCtrl',
            data: {
                pageTitle: 'Executive Summary Analisa Agunan'
            }
        })
        
        /* FAKTOR KUALITATIF */
        
        .state('survey.faktorkualitatif',{
            url: '/faktor-kualitatif',
            templateUrl: 'partials/survey/faktor-kualitatif.html',
            controller: 'fkNoteCtrl',
            data: {
                pageTitle: 'Faktor Kualitatif'
            }
        })
        
        /* ANGSURAN */
        
        .state('survey.keuangan.angsuran',{
            url: '/angsuran',
            templateUrl: 'partials/survey/rincian-angsuran.html',
            controller: 'rincianAngsuranCtrl',
            data: {
                pageTitle: 'Angsuran'
            }
        })
        
        .state('survey.keuangan.angsuran.baru',{
            url: '/baru',
            templateUrl: 'partials/survey/rincian-angsuran-baru.html',
            controller: 'rincianAngsuranBaruCtrl',
            data: {
                pageTitle: 'Rincian Angsuran Baru'
            }
        })
        
        .state('survey.keuangan.angsuran.3r',{
            url: '/3r',
            templateUrl: 'partials/survey/rincian-angsuran-3r.html',
            controller: 'rincianAngsuran3RCtrl',
            data: {
                pageTitle: 'Rincian Angusuran 3R'
            }
        })
        
        /* PENJAMIN */
        
        .state('survey.penjamin',{
            url: '/penjamin',
            templateUrl: 'partials/survey/penjamin.html',
            controller: 'penjaminCtrl',
            data: {
                pageTitle: 'Penjamin'
            }
        })
				
        /* DOKUMEN SURVEY */
        
        .state('survey.dokumen', {
            url: '/dokumen',
            templateUrl: 'partials/survey/dokumen.html',
            controller: 'dokumenSurveyCtrl',
            data: {
                pageTitle: 'Dokumen'
            }
        })
        
        /* DEVIASI */
        
        .state('survey.deviasi', {
            url: '/deviasi',
            templateUrl: 'partials/survey/deviasi.html',
            controller: 'deviasiCtrl',
            data: {
                pageTitle: 'Deviasi'
            }
        })
				
        
        /* ==================================================================================
         * #################################### FDE STATE ################################
         * ==================================================================================*/
        
        .state('fde',{
            url: '/fde/:id',
            templateUrl: 'partials/fde/fde-index.html',
            controller: 'fdeCtrl',
            data: {
                pageTitle: 'Full Data Entry'
            }
        })
        
        .state('fdelist',{
            url: '/list-fde',
            templateUrl: 'partials/fde/fde-list.html',
            controller: 'fdeListCtrl',
            data: {
                pageTitle: 'Daftar Full Data Entry'
              }
        })
        
        .state('fde.calondebiturinfo',{
            url: '/calon-debitur-info',
            templateUrl: 'partials/fde/calon-debitur-info.html',
            data: {
                pageTitle: 'Data Calon Debitur'
              }
        })
        
        .state('fde.nomorrekeningpembiayaan',{
            url: '/nomor-rekening-pembiayaan',
            templateUrl: 'partials/fde/nomor-rekening-pembiayaan.html',
            data: {
                pageTitle: 'Nomor Rekening Pembiayaan'
              }
        })
        
        .state('fde.historypembiayaansebeumnya',{
            url: '/history-pembiayaan-sebeumnya',
            templateUrl: 'partials/fde/history-pembiayaan-sebeumnya.html',
            data: {
                pageTitle: 'History Pembiayaan Sebelumnya'
              }
        })
        
        .state('fde.virtualaccount',{
            url: '/virtual-account',
            templateUrl: 'partials/fde/virtual-account.html',
            controller: 'fdeVirtulaAccountCtrl',
            data: {
                pageTitle: 'Virtual Account'
              }
        })
        
        .state('fde.aplikasi',{
            url: '/aplikasi',
            templateUrl: 'partials/fde/aplikasi.html',
            data: {
                pageTitle: 'Aplikasi'
              }
        })
        
        .state('fde.angsuran',{
            url: '/angsuran',
            templateUrl: 'partials/fde/angsuran.html',
            data: {
                pageTitle: 'Angsuran'
              }
        })
        
        .state('fde.asuransilpk',{
            url: '/asuransi-lpk',
            templateUrl: 'partials/fde/asuransi-lpk.html',
            controller: 'fdeAsuransiLpkCtrl',
            data: {
                pageTitle: 'Asuransi'
              }
        })
        
        .state('fde.produkasuransi',{
            url: '/produk-asuransi',
            templateUrl: 'partials/fde/produk-asuransi.html',
            controller: 'fdeProdukAsuransiCtrl',
            data: {
                pageTitle: 'Produksi Asuransi'
              }
        })
        
        .state('fde.biaya',{
            url: '/biaya',
            templateUrl: 'partials/fde/biaya.html',
            data: {
                pageTitle: 'Biaya'
              }
        })
        
        .state('fde.sisteminformasidebitur',{
            url: '/sistem-informasi-debitur',
            templateUrl: 'partials/fde/sistem-informasi-debitur.html',
            data: {
                pageTitle: 'Sistem Informasi Debitur'
              }
        })
        
        .state('fde.perjanjiankredit',{
            url: '/perjanjian-kredit',
            templateUrl: 'partials/fde/perjanjian-kredit.html',
            data: {
                pageTitle: 'Perjanjian Kredit'
              }
        })
        
        .state('fde.kolektor',{
            url: '/kolektor',
            templateUrl: 'partials/fde/kolektor.html',
            data: {
                pageTitle: 'Kolektor'
              }
        })
        
        .state('fde.rekeningpribadi',{
            url: '/rekening-pribadi',
            templateUrl: 'partials/fde/rekening-pribadi.html',
            data: {
                pageTitle: 'Rekening Pribadi'
              }
        })
        
        .state('fde.rekeningtujuanpencairan',{
            url: '/rekening-tujuan-pencairan',
            templateUrl: 'partials/fde/rekening-tujuan-pencairan.html',
            data: {
                pageTitle: 'Rekening Tujuan Pencairan'
              }
        })
        
        .state('fde.historyapproval',{
            url: '/history-approval',
            templateUrl: 'partials/fde/history-approval.html',
            data: {
                pageTitle: 'History Persetujuan'
            },
            controller: 'fdeHistoryApprovalCtrl'
        })				
        
		/*FZL*/
		.state('fde.traceapproval',{
            url: '/trace-approval',
            templateUrl: 'partials/fde/trace-approval.html',
            data: {
                pageTitle: 'Lacak Persetujuan'
            },
            controller: 'fdeTraceApprovalCtrl'
        })		
		
        /* ==================================================================================
         * #################################### REVIEW STATE ################################
         * ==================================================================================*/
        
        .state('reviewlist',{
            url: '/review-list',
            templateUrl: 'partials/review/review-list.html',
            controller: 'reviewListCtrl',
            data: {
                pageTitle: 'Daftar Review'
            }
        })
        
        .state('review',{
            url: '/review/:id',
            templateUrl: 'partials/review/review-index.html',
            controller: 'reviewCtrl',
            data: {
                pageTitle: 'Review'
            }
        })
        
        .state('review.dataumum',{
            url: '/data-umum',
            templateUrl: 'partials/review/data-umum.html',
            data: {
                pageTitle: 'Data Umum'
            }
        })
        
        .state('review.datanasabah',{
            url: '/data-nasabah',
            templateUrl: 'partials/review/data-nasabah.html',
            data: {
                pageTitle: 'Data Nasabah'
            }
        })
        
        .state('review.datanasabah.index',{
            url: '/index',
            templateUrl: 'partials/review/data-nasabah-index.html',
            data: {
                pageTitle: 'Data Nasabah'
            }
        })
        
        .state('review.datanasabah.sisteminformasidebitur',{
            url: '/sistem-informasi-debitur',
            templateUrl: 'partials/review/sistem-informasi-debitur.html',
            controller: 'reviewAsDnSidCtrl',
            data: {
                pageTitle: 'Sistem Informasi Debitur'
            }
        })
        
        .state('review.comment',{
            url: '/comment',
            templateUrl: 'partials/review/comment.html',
            controller: 'reviewCommentCtrl',
            data: {
                pageTitle: 'Catatan'
            }
        })
        
        .state('review.rekomendasi',{
            url: '/rekomendasi',
            templateUrl: 'partials/review/rekomendasi.html',
            controller: 'reviewRekomendasiCtrl',
            data: {
                pageTitle: 'Rekomendasi'
            }
        })
        
        .state('review.analisasensitivitas',{
            url: '/analisa-sensitivitas',
            templateUrl: 'partials/review/analisa-sensitivitas.html',
            data: {
                pageTitle: 'Analisa Sensitivitas'
            }
        })
        
        .state('review.analisasensitivitas.datafasilitaslama',{
            url: '/data-fasilitas-lama',
            templateUrl: 'partials/review/data-fasilitas-lama.html',
            controller: 'reviewAsFlCtrl',
            data: {
                pageTitle: 'Data Fasilitas Lama'
            }
        })
        
        .state('review.analisasensitivitas.rcrusulanrekomendasi',{
            url: '/rcr-usulan-&-rcr-rekomendasi',
            template: '<ui-view></ui-view>'
        })
        
        .state('review.analisasensitivitas.rcrusulanrekomendasi.lkku',{
            url: '/lkku',
            templateUrl: 'partials/review/rcr-usulan-rekomendasi.html',
            controller: 'reviewAsRcrCtrl',
            data: {
                pageTitle: 'RCR Usulan & RCR Rekomendasi LKKU'
            }
        })
        
        .state('review.analisasensitivitas.rcrusulanrekomendasi.reviewer',{
            url: '/reviewer',
            templateUrl: 'partials/review/rcr-usulan-rekomendasi-reviewer.html',
            controller: 'reviewAsRcrReviewerCtrl',
            data: {
                pageTitle: 'RCR Usulan & RCR Rekomendasi Reviewer'
            }
        })
        
        .state('review.analisasensitivitas.analisamodalkerja',{
            url: '/analisa-modal-kerja',
            template: '<ui-view></ui-view>'
        })
        
        .state('review.analisasensitivitas.analisamodalkerja.lkku',{
            url: '/lkku',
            templateUrl: 'partials/review/analisa-modal-kerja.html',
            controller: 'reviewAsAmkCtrl',
            data: {
                pageTitle: 'Analisa Modal Kerja LKKU'
            }
        })
        
        .state('review.analisasensitivitas.analisamodalkerja.reviewer',{
            url: '/reviewer',
            templateUrl: 'partials/review/analisa-modal-kerja-reviewer.html',
            controller: 'reviewAsAmkReviewerCtrl',
            data: {
                pageTitle: 'Analisa Modal Kerja Reviewer'
            }
        })
        
        .state('review.analisasensitivitas.agunandanscr',{
            url: '/agunan-dan-scr',
            templateUrl: 'partials/review/agunan-dan-scr.html',
            controller: 'reviewAsAgScrCtrl',
            data: {
                pageTitle: 'Agunan dan CCR'
            }
        })
        
        .state('review.documentcheck',{
            url: '/document-check',
            templateUrl: 'partials/review/document-check.html',
            controller: 'reviewDocCheckCtrl',
            data: {
                pageTitle: 'Cek Kelengkapan Dokumen'
            }
        })
        
        /* ==================================================================================
         * ################################ MANAJEMEN PRODUK ################################
         * ==================================================================================*/
        
        .state('produklist',{
            url: '/produk-list',
            templateUrl: 'partials/produk/produk-list.html',
            controller: 'produkListCtrl',
            data: {
                pageTitle: 'Produk List'
            }
        })
        
        .state('produk',{
            url: '/produk',
            templateUrl: 'partials/produk/produk.html',
            controller: 'produkCtrl'
        })
        
        .state('produk.kategori',{
            url: '/kategori',
            templateUrl: 'partials/produk/produk-kategori.html',
            controller: 'produkKategoriCtrl',
            data: {
                pageTitle: 'Produk Kategori'
            }
        })
        
        .state('produk.lokasi',{
            url: '/lokasi',
            templateUrl: 'partials/produk/produk-lokasi.html',
            controller: 'produkLokasiCtrl',
            data: {
                pageTitle: 'Produk Lokasi'
            }
        })
        
        .state('produk.scoring',{
            url: '/scoring',
            templateUrl: 'partials/produk/produk-scoring.html',
            controller: 'produkScoringCtrl',
            data: {
                pageTitle: 'Produk Scoring'
            }
        })
		
        /* ==================================================================================
         * ################################ REPORT ################################
         * ==================================================================================*/

        .state('reportnasabah', {
            url: '/reportnasabah',
            templateUrl: 'partials/report/nasabah.html',
            controller: 'reportNasabahCtrl',
            data: {
                pageTitle: 'Daftar Nasabah'
            }
        })
		
		.state('reportsalesactivity', {
            url: '/reportsalesactivity',
            templateUrl: 'partials/report/sales-activity.html',
            controller: 'reportSalesActivityCtrl',
            data: {
                pageTitle: 'Report Sales Activity'
            }
        })
        
        /* ==================================================================================
         * ################################ PROPOSAL ################################
         * ==================================================================================*/
        
        .state('proposal', {
            url: '/proposal',
            template: '<ui-view></ui-view>',
            data: {
                pageTitle: 'Proposal'
            }
        })
        
        .state('proposal.list', {
            url: '/list',
            templateUrl: 'partials/proposal/daftar.html',
            controller: 'proposalListCtrl',
            data: {
                pageTitle: 'Daftar Proposal'
            }
        })
        
        .state('proposal.tracking', {
            url: '/tracking/:id',
            templateUrl: 'partials/proposal/tracking.html',
            controller: 'proposalTrackingCtrl',
            data: {
                pageTitle: 'Tracking Proposal'
            }
        })
		
		
        /* ==================================================================================
         * ################################ PORTOFOLIO ################################
         * ==================================================================================*/

        .state('portofolio', {
            url: '/portofolio',
            templateUrl: 'partials/portofolio/portofolio-list.html',
            controller: 'portofolioListCtrl',
            data: {
                pageTitle: 'Daftar Portofolio Account Assignment'
            }
        })
        
        ;
        
        $urlRouterProvider.otherwise('/');
        
        /* CACHE DISABLE */
        
        $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.cache = false;
        
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
        
        /* CHECK XHR LOADED */
        
        $httpProvider.interceptors.push('httpInterceptor');
        
        /* HTML5MODE */
        
        //$stateProvider.html5Mode(true);
//        $locationProvider.html5Mode({
//            enabled: true,
//            requireBase: false
//        });
        
//        $locationProvider.html5Mode(true);
//        $locationProvider.hashPrefix('!');
        
        /* DATE FORMAT */
        
//        $mdDateLocaleProvider.formatDate = function(date) {
//            var m = moment(date).format('YYYY-MM-DD');
//            var m = moment(date, 'DD-MM-YYYY', true);
//            return m.isValid() ? m.toDate() : '';
//        };

});

App.run(['$sessionStorage','$location', '$rootScope', '$stateParams', 'apiData', 'globalFunction', 'fileBase', 'postProspekStatus', 'postSurveyStatus', '$interval', 'ngProgressFactory', 'getDataStatusSubmit','getDataStatusCekSlik', '$state', 'postDbIndividuStatus', '$window','postLKKUulang',
    function($sessionStorage, $location, $rootScope, $stateParams, apiData, globalFunction, fileBase, postProspekStatus, postSurveyStatus, $interval, ngProgressFactory, getDataStatusSubmit,getDataStatusCekSlik, $state, postDbIndividuStatus, $window, postLKKUulang) {
        
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            
            /* Check auth */
            apiData.checkauth();
            
            $rootScope.$storage = $sessionStorage;
            
            $rootScope.MY_MATH = window.Math;
            
            $rootScope.DateToday = new Date();
            
//            $rootScope.DateToday = $rootScope.DateToday.toLocaleString(myDateConfig);
            
        });		
            
        $rootScope.$on('$stateChangeSuccess', function (event, current, previous) {
             
            //if (current.hasOwnProperty('$$route')) {
                //$rootScope.title = current.$$route.title;
            //}
            $rootScope.agShow = false;
            
            $rootScope.FILE_BASE = fileBase;			
            
            $rootScope.progressType = function(v){
                
                var type;

                if (v <= 100) {
                    type = 'info';
                }

                if (v <= 80) {
                    type = 'success';
                }

                if (v <= 50) {
                    type = 'warning';
                }

                if (v <= 25) {
                    type = 'danger';
                }

                return type;

            };
            
            $rootScope.logout = function(){
                
                apiData.logout();
                
            };
            
            $rootScope.thisState = $state.current.name;						
            
            console.log('this state', $rootScope.thisState);			
            
            if (    
                $rootScope.thisState == 'survey.keuangan.rincianpinjaman' 
                || $rootScope.thisState == 'survey.keuangan.angsuran.baru'
                || $rootScope.thisState == 'survey.keuangan.angsuran.3r'
            ) {
                $rootScope.BTN_SUBMIT_KEUANGAN_HIDE = 'hide'; 
            } else {
                $rootScope.BTN_SUBMIT_KEUANGAN_HIDE = ''; 
            }
            
            $rootScope.tableItemPerPage = [10,50,100];
            
            $rootScope.submitProspek = function(id){
                if (!id) id = $stateParams.id;
                postProspekStatus.e(id);
            };

            $rootScope.submitSurvey = function(id){
                if (!id) id = $stateParams.id;
                postSurveyStatus.e(id);
            };

            $rootScope.submitProspekToApproval = function(id){				
                /*FZL 20/4/2018*/		
                getDataStatusCekSlik.e($stateParams.id);
                console.log($rootScope.STATUS_SLIK);
                if ($rootScope.STATUS_SLIK >= 2){
                        if (!id) id = $stateParams.id;
                        postDbIndividuStatus.e(id,0,1);
                }else{
                        globalFunction.ag('danger',['Hasil pengecekan SLIK masih On Progress']);
                }
            };

                        /*tambahan FZL*/
            $rootScope.submitSurveyToApproval = function(id){
                if (!id) id = $stateParams.id;
                postDbIndividuStatus.e(id,1,1);
            };

            $rootScope.rejectProspek = function(id){
                if (!id) id = $stateParams.id;
                postDbIndividuStatus.e(id,0,2);
            };

                        /*tambahan FZL*/
            $rootScope.rejectSurvey = function(id){
                if (!id) id = $stateParams.id;
                postDbIndividuStatus.e(id,1,2);
            };
            
			/*tambahan FZL*/
			$rootScope.revisiProspek = function(id){
                if (!id) id = $stateParams.id;
                postDbIndividuStatus.e(id,0,0);
            };
			/*tambahan FZL*/
			$rootScope.revisiSurvey = function(id){
                if (!id) id = $stateParams.id;
                postDbIndividuStatus.e(id,1,0);
            };
            
            $rootScope.teruskanSurvey = function(id){
                if (!id) id = $stateParams.id;
                postDbIndividuStatus.e(id,3,1);
            };
            
            $rootScope.lkkuulang = function(id){
                if (!id) id = $stateParams.id;
                postLKKUulang.e(id);
            };
            
//            if ($rootScope.$storage.SESSION_LOGIN != undefined)
//                $window.ga('send', 'pageview', $location.path() + ' - ' + $rootScope.$storage.SESSION_LOGIN.NAMA);
           
        });
        
//        $window.ga('create', 'UA-119271236-1', 'auto');
        
        $rootScope.$on('loading:progress', function (){
            $rootScope.progressbar = ngProgressFactory.createInstance();
            $rootScope.progressbar.start();
        });
        $rootScope.$on('loading:finish', function (){
            $rootScope.progressbar.complete();
        });        
        
        $rootScope.bulan = apiData.bulan();
		
		apiData.get_masterData('data_master');
		
		apiData.get_masterData('produk_list');
        apiData.get_masterData('program_list');   
        
        /*apiData.get_masterData('provinsi');
        apiData.get_masterData('kabkot');
        apiData.get_masterData('kec');
        apiData.get_masterData('keldes');*/
		
		/* PAKE DATA_MASTER
        apiData.get_masterData('agama');
        apiData.get_masterData('kewarganegaraan');
        apiData.get_masterData('pekerjaan');
        apiData.get_masterData('pendidikan');
        apiData.get_masterData('tuj_pembiayaan');
        apiData.get_masterData('hub_keluarga');
        apiData.get_masterData('jns_identitas');
        apiData.get_masterData('jns_alamat'); 		
		apiData.get_masterData('jns_alamat2');*/
		
		/* PAKE DATA_MASTER
        apiData.get_masterData('jns_kelamin');
        apiData.get_masterData('jns_referensi');
		
        //apiData.get_masterData('rencana_agunan');
        apiData.get_masterData('jns_usaha');
        apiData.get_masterData('jns_agunan');
        apiData.get_masterData('jns_kontak');
        apiData.get_masterData('stat_tempat');
        apiData.get_masterData('jns_dokumen');
		
		apiData.get_masterData('jns_ktp');
        apiData.get_masterData('produk');
        apiData.get_masterData('jns_pembiayaan');
        apiData.get_masterData('perkawinan'); */
		/* PAKE DATA MASTER COBA
        apiData.get_masterData('wilayah');*/
//        apiData.get_masterData('sektor_ekonomi');

		/* PAKE DATA MASTER
        apiData.get_masterData('kode_golongan_sid');
        apiData.get_masterData('global','MS_RELASI_DEB_PNM_SID_ID');
        apiData.get_masterData('global','MS_RELASI_DEB_BANK_ID');
		apiData.get_masterData('jns_foto');*/
				
     
		/* PAKE DATA MASTER COBA
        apiData.get_masterData('lov_bidang_usaha_sid_mis');*/
		
		/* PAKE DATA MASTER
		//FZL start agunan kios			
		apiData.get_masterData('MS_STATUS_KIOS');
		apiData.get_masterData('MS_JENIS_KIOS');
		//FZL end
		*/
				
         
        /* Informasi Survey */
		/* PAKE DATA MASTER
        apiData.get_masterData('global','MS_PRODUK_ID');
        apiData.get_masterData('global','MS_TUJUAN_PEMBIAYAAN_ID');
        apiData.get_masterData('global','MS_LOKASI_ID');
        apiData.get_masterData('global','MS_HUBUNGAN_PEMOHON_ID'); */
        
        /* Profile & Karakter */
		/* PAKE DATA MASTER
        apiData.get_masterData('global','MS_PENDIDIKAN_ID');
        apiData.get_masterData('global','MS_STATUS_PERKAWINAN_ID');
        apiData.get_masterData('global','MS_KERJASAMA_PEMOHON_ID');
        apiData.get_masterData('global','MS_TRACK_RECORD_ID');
        apiData.get_masterData('global','MS_MENGENAL_ULAMM_ID');
        apiData.get_masterData('global','MS_REPUTASI_ID'); */
        
        /* Kapasitas Usaha */
		/* PAKE DATA MASTER
        apiData.get_masterData('global','MS_HARTA_ID');
        apiData.get_masterData('global','MS_JENIS_REKENING_ID');
        apiData.get_masterData('global','MS_PEKERJAAN_ID'); */
        
        /* Jenis Usaha */
		/* PAKE DATA MASTER
        apiData.get_masterData('global','MS_BENTUK_USAHA_ID');
        apiData.get_masterData('global','MS_JENIS_BADAN_USAHA_ID');
        apiData.get_masterData('global','MS_JENIS_USAHA_ID');
        apiData.get_masterData('global','MS_PRODUK_DITAWARKAN_ID');
        apiData.get_masterData('global','MS_KEGIATAN_USAHA_ID');
        apiData.get_masterData('global','MS_KONDISI_TEMPAT_USAHA_ID');
        apiData.get_masterData('global','MS_AKSES_KENDARAAN_ID');
        apiData.get_masterData('global','MS_KETERSEDIAAN_BAHAN_BAKU_ID');
        apiData.get_masterData('global','MS_JML_PEMASOK_ID');
        apiData.get_masterData('global','MS_PERSAINGAN_USAHA_ID');
        apiData.get_masterData('global','MS_KONDISI_SEKTOR_USAHA_ID');
        apiData.get_masterData('global','MS_LOKASI_USAHA_ID');
        apiData.get_masterData('global','MS_PERIODE_ID');
//        apiData.get_masterData('global','MS_POLA_PEMBAYARAN_ID');
        apiData.get_masterData('global','MS_POLA_PEMBELIAN_ID');
        apiData.get_masterData('global','MS_PEMBAYARAN_ID');
        apiData.get_masterData('global','MS_PENGELOLAAN_KEUANGAN_ID');*/
        
        /* Keuangan */
		/* PAKE DATA MASTER
        apiData.get_masterData('global','MS_PRODUK_ID');
        apiData.get_masterData('global','MS_PROGRAM_ID');
//        apiData.get_masterData('global','MS_TUJUAN_PEMBIAYAAN_ID');
        apiData.get_masterData('global','MS_BANK_ID');
//        apiData.get_masterData('global','MS_TUJUAN_PEMBIAYAAN_ID');
        apiData.get_masterData('global','MS_KOLEKTIBILITAS_ID'); */
        
        /* Kebutuhn Modal Kerja */
		/* PAKE DATA MASTER
        apiData.get_masterData('global','MS_JENIS_ASSET_ID');*/
//        apiData.get_masterData('global','MS_TUJUAN_PEMBIAYAAN_ID');
        
        /* Agunan */
		/* PAKE DATA MASTER
        apiData.get_masterData('global','MS_KEPEMILIKAN_ID');
        apiData.get_masterData('global','MS_HUBUNGAN_PEMOHON_ID');
        apiData.get_masterData('global','MS_BUKTI_KEPEMILIKAN_AGUNAN_ID');
        apiData.get_masterData('global','MS_PERUNTUKAN_LOKASI_ID');
        apiData.get_masterData('global','MS_JALAN_DILALUI_ID');
        apiData.get_masterData('global','MS_BENTUK_TANAH_ID');
        apiData.get_masterData('global','MS_KONDISI_PERMUKAAN_ID');
        apiData.get_masterData('global','MS_PENGGUNAAN_TANAH_ID');
        apiData.get_masterData('global','MS_BATAS_ID');
        apiData.get_masterData('global','MS_STATUS_TEMPAT_ID'); //status tanah
        apiData.get_masterData('global','MS_AIR_ID');
        apiData.get_masterData('global','MS_PONDASI_ID');
        apiData.get_masterData('global','MS_LANTAI_ID');
        apiData.get_masterData('global','MS_DINDING_ID');
        apiData.get_masterData('global','MS_PLAFON_ID');
        apiData.get_masterData('global','MS_KUSEN_ID');
        apiData.get_masterData('global','MS_ATAP_ID');
        apiData.get_masterData('global','MS_PINTU_ID');
        apiData.get_masterData('global','MS_JENDELA_ID');
        apiData.get_masterData('global','MS_PENILAIAN_ID');
        apiData.get_masterData('global','MS_JENIS_PENILAIAN');*/ /*FZL*/

        /* Faktor Kualitatif */
		/* PAKE DATA MASTER
        apiData.get_masterData('global','MS_JENIS_CATATAN_ID');*/
        
        /* Rekening Tujuan Pencairan */
		/* PAKE DATA MASTER
        apiData.get_masterData('global','MS_REKENING_TUJUAN_JENIS_ID'); */
        
        /* FDE */
		
		/* PAKE DATA MASTER COBA
        apiData.get_masterData('lpk');
        apiData.get_masterData('produk_asuransi');*/
		/* PAKE DATA MASTER
        apiData.get_masterData('global','MS_GOLONGAN_PENJAMINAN_ID');
        apiData.get_masterData('global','MS_SIFAT_PENJAMINAN_ID');
        apiData.get_masterData('global','MS_STATUS_ASURANSI_AGUNAN_ID');
        apiData.get_masterData('global','MS_GOLONGAN_KREDIT_ID');
        apiData.get_masterData('global','MS_JENIS_FASILITAS_ID');
        apiData.get_masterData('global','MS_NAMA_PENGADILAN_NEGERI_ID');*/
		/* PAKE DATA MASTER COBA
        apiData.get_masterData('kolektor');*/
        
        /* REVIEW */
		/* PAKE DATA MASTER
        apiData.get_masterData('global','MS_JENIS_GAMBARAN_UMUM_REVIEW');*/
        
        /* MANAJEMEN PRODUK */
		/* PAKE DATA MASTER
        apiData.get_masterData('global','MS_JENIS_PRODUK_ID');
        apiData.get_masterData('global','MS_JENIS_SUMBER_DANA_ID');
        apiData.get_masterData('global','MS_SUMBER_DANA_ID');
        apiData.get_masterData('global','MS_JENIS_DCA_ID');
        apiData.get_masterData('global','MS_POLA_PENCAIRAN_ID');
        apiData.get_masterData('global','MS_NILAI_PENCAIRAN_ID');
        apiData.get_masterData('global','MS_MATA_UANG_ID');
        apiData.get_masterData('global','MS_LOKASI_PRODUK_ID');
        apiData.get_masterData('global','MS_REG_PRO_ID');
        apiData.get_masterData('global','MS_JENIS_SUKU_BUNGA_ID');
        apiData.get_masterData('global','MS_JENIS_PEMBAYARAN_PRODUK_ID');
        apiData.get_masterData('global','MS_JENIS_PERHITUNGAN_BUNGA_ID');
        apiData.get_masterData('global','MS_JADWAL_PERHITUNGAN_BUNGA_ID');
        apiData.get_masterData('global','MS_JENIS_PEMOTONGAN_BUNGA_ID');
        apiData.get_masterData('global','MS_STRUKTUR_KREDIT_HARI_DALAM_SATU_TAHUN_ID');
        apiData.get_masterData('global','MS_STRUKTUR_KREDIT_HARI_DALAM_SATU_BULAN_ID');
        apiData.get_masterData('global','MS_STRUKTUR_KREDIT_HARI_LIBUR_ID');
        apiData.get_masterData('global','MS_STRUKTUR_KREDIT_NILAI_BIAYA_ID');
        apiData.get_masterData('global','MS_KATEGORI_PEMBIAYAAN_ID');
        apiData.get_masterData('global','MS_KATEGORI_PRODUK_ID');
        
        apiData.get_masterData('global','MS_JENIS_DEVIASI_ID');
        apiData.get_masterData('global','MS_JENIS_TOP_UP_ID');
        
        apiData.get_masterData('global','MS_KLASIFIKASI_JALAN_ID');
        apiData.get_masterData('global','MS_JENIS_TANAH_ID');*/
        
		/* PAKE DATA MASTER COBA
        apiData.get_masterData('btb','MATERIAL'); 
        apiData.get_masterData('btb','JENIS_BANGUNAN');
        apiData.get_masterData('btb','TIPE_BANGUNAN'); */
        
        $rootScope.AKTIFITAS_REKENING_BANK_BULAN_KE = [1,2,3];
        
        console.log('ROOTSCOPE',$rootScope);
        
    }
]);

/*======================== FACTORY ==========================*/

App.factory("apiData", function ($sessionStorage, $http, globalFunction, $rootScope, webServiceBase, apiBase, $stateParams, getDataStatusSubmit, $state, getKelengkapanDataById, getDataStatusCekSlik) {
    
    return {
        
        get : function(d){ // { api, scope, sn, gl(true/false), type }
            
            if (d['gl']) globalFunction.openModalLoading();
            
            var scope = d['scope'], sn = d['sn'], THIS = this;
            
            $http({
                method : "GET",
                url : d['api'],
                dataType: 'json',
                headers: { 'Content-Type':'application/json' },
            }).then(function mySuccess(R) {
                
                console.log('DATA GET ORI',R);
                
                if (d['type'] == 'tolist' || d['type'] == 'object') 
                    scope[sn] = (typeof R.data !== 'undefined') ? R.data : [];      
                else
                    scope[sn] = (typeof R.data[0] !== 'undefined') ? R.data[0] : {};
                
                if (d['setdate']) {
                    for (var i=0; i < d['setdate'].length; i++) {
                        scope[d['setdate'][i]['k']] = new Date(scope[sn][d['setdate'][i]['v']]);						
                        console.log('WORKING '+ d['setdate'][i]['k']);
                    }
                }		
                
                if (d['alamat']) {
                    THIS.alamatSet({
                        scope   : scope,
                        fd      : sn
                    });
                }
                
                if (d['callbacksuccess']) d['callbacksuccess'](R);
                
                if (d['gl']) globalFunction.closeModalLoading();
                
                console.log(R);
            
            }, function myError(R) { 
                console.log(R.statusText);  
                globalFunction.ag('danger',[R]); 
                if (d['gl']) globalFunction.closeModalLoading();
                if (d['callbackerror']) d['callbackerror'](R);
            });
            
        },
        
        post : function(d) { //{ type(tolist), api, data, scope, ls, fd, gl(true/false)}
            
            console.log(d['data']);
            
            if (d['dataType'] == 'multidimensional')
                var dataF = d['data'];
            else
                var dataF = globalFunction.serializeObj(d['data']);
            
            if (d['gl'])
                globalFunction.openModalLoading();
            
            return $http({
                method: 'POST',
                url: d['api'],
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                    //'Content-Type': 'application/json; charset=utf-8'
                    //'Content-Type':'application/json'
                },
                data: dataF
                //data: angular.toJson($scope.formDataProspek)
            }).then(function(R){
                if (R.status == '200' && typeof R.data.status && (R.data.status == 'Success' || R.data.status == true)) {
//                    globalFunction.ag('success '+d['ag'],R.data);
                    globalFunction.ag('success '+d['ag'],['Berhasil']);
                    if (d['type'] === 'tolist') {
                        d['scope'][d['ls']] = R.data;
                        d['scope'][d['fd']] = {};
                    }
                    if (d['cm']) $rootScope[d['cm']]();
                    
                    var homestate = $state.current.name.split('.')[0];
                    
                    console.log('state',homestate);
                    
                    if (homestate == 'survey'){
                        getKelengkapanDataById.e({
                            scope   : $rootScope,
                            id      : $stateParams.id,
                            type    : 'survey'
                        });
                    }
                    
                    if (homestate == 'prospek'){
                        getKelengkapanDataById.e({
                            scope   : $rootScope,
                            id      : $stateParams.id,
                            type    : 'prospek'
                        });
                    }
                    
                    if (d['callbacksuccess']) d['callbacksuccess']();
                    
                    if (d['resetdate']) {
                        for (var i=0; i < d['resetdate'].length; i++) {
                            d['scope'][d['resetdate'][i]['k']] = d['resetdate'][i]['v'];
                        }
                    }
                    
                } else {
//                    globalFunction.ag('danger '+d['ag'],R.data);
                    globalFunction.ag('danger '+d['ag'],['Gagal']);
                     
                    if (d['callbackfailed']) d['callbackfailed'](R.data); 
                     
                }
                console.log(R);
                
                if (d['gl']) globalFunction.closeModalLoading();
                
                if (d['reload']) d['scope'][d['reload']]($stateParams.id);
                
                if (d['reloadr']) $rootScope[d['reloadr']['k']](d['reloadr']['v']);
                
                if (d['reloadp']) d['scope'][d['reloadp']['k']](d['reloadp']['v']);
                
                if (d['callback']) d['callback']();
                
            }, function myError(R){ 
                console.log(R);
                globalFunction.ag('danger '+d['ag'],R);
                if (d['gl']) globalFunction.closeModalLoading();
            });
            
        },
        
        get_masterData : function(k,p){
            
            var api;
            
            switch (k) {
                case 'data_master' :
                    api = webServiceBase + 'master/lov_data_master';
                    break;				
                case 'provinsi' :
                    api = webServiceBase + 'master/lov_provinsi';
                    break;
                case 'kabkot' :
                    api = webServiceBase + 'master/lov_kabkot/'+(p ? p : '');
                    break;
                case 'kec' :
                    api = webServiceBase + 'master/lov_kec/'+(p ? p : '');
                    break;
                case 'keldes' :
                    api = webServiceBase + 'master/lov_keldes/'+(p ? p : '');
                    break;
                case 'agama' :
                    api = webServiceBase + 'master/lov_agama';
                    break;
                case 'kewarganegaraan' :
                    api = webServiceBase + 'master/lov_kewarganegaraan';
                    break;
                case 'pekerjaan' :
                    api = webServiceBase + 'master/lov_pekerjaan';
                    break;
                case 'pendidikan' :
                    api = webServiceBase + 'master/lov_pendidikan';
                    break;
                case 'tujuan_pembiayaan' :
                    api = webServiceBase + 'master/lov_tujuan_pembiayaan';
                    break;
                case 'hub_keluarga' :
                    api = webServiceBase + 'master/lov_hub_keluarga';
                    break;
                case 'jns_identitas' :
                    api = webServiceBase + 'master/lov_jns_identitas';
                    break;
                case 'jns_alamat' :
                    api = webServiceBase + 'master/lov_jns_alamat';
                    break;
                case 'jns_alamat2' :
                    api = webServiceBase + 'master/lov_jns_alamat2';
                    break;
                case 'jns_kelamin' :
                    api = webServiceBase + 'master/lov_jns_kelamin';
                    break;
                case 'jns_referensi' :
                    api = webServiceBase + 'master/lov_jns_referensi';
                    break;
                case 'rencana_agunan' :
                    api = webServiceBase + 'master/lov_rencana_agunan';
                    break;
                case 'jns_usaha' :
                    api = webServiceBase + 'master/lov_jns_usaha';
                    break;
                case 'jns_agunan' :
                    api = webServiceBase + 'master/lov_jns_agunan';
                    break;
                case 'stat_tempat' :
                    api = webServiceBase + 'master/lov_stat_tempat';
                    break;
                case 'tuj_pembiayaan' :
                    api = webServiceBase + 'master/lov_tuj_pembiayaan';
                    break;
                case 'jns_kontak' :
                    api = webServiceBase + 'master/lov_jns_kontak';
                    break; 
                case 'jns_dokumen' :
                    api = webServiceBase + 'master/lov_jns_dokumen';
                    break;
				case 'jns_ktp' :
                    api = webServiceBase + 'master/lov_jns_ktp';
                    break;
                case 'produk' :
                    api = webServiceBase + 'master/lov_produk';
                    break;
                case 'jns_pembiayaan' :
                    api = webServiceBase + 'master/lov_jns_pembiayaan';
                    break;
                case 'perkawinan' :
                    api = webServiceBase + 'master/lov_perkawinan/';
                    break;
                case 'global' :
                    api = webServiceBase + 'master/lov_global/'+(p ? p : '');
                    break;
                case 'wilayah' :
                    api = webServiceBase + 'master/lov_wilayah/';
                    break;
                case 'cabang' :
                    api = webServiceBase + 'master/lov_cabang/'+(p ? p : '');
                    break;
                case 'unit' :
                    api = webServiceBase + 'master/lov_unit/'+(p ? p : '');
                    break;
                case 'lpk' : 
                    api = webServiceBase + 'master/lpk';
                    break;
                case 'produk_asuransi' : 
                    api = webServiceBase + 'master/asuransi';
                    break;
                case 'kolektor' : 
                    api = webServiceBase + 'master/kolektor';
                    break;
                case 'sektor_ekonomi' : 
                    api = webServiceBase + 'master/lov_sektor_ekonomi';
                    break;
                case 'kode_golongan_sid' : 
                    api = webServiceBase + 'master/lov_global/MS_KODE_GOLONGAN_DEBITUR_SID_ID';
                    break;
                case 'produk_list' :
                    api = apiBase + 'prospek/get_produklist';
                    break;
                case 'program_list' :
                    api = apiBase + 'prospek/get_programlist';
                    break;
                case 'jns_foto' :
                    api = webServiceBase + 'master/lov_jns_foto';
                    break;
                case 'lov_bidang_usaha_sid_mis' :
                    api = webServiceBase + 'master/lov_bidang_usaha_sid_mis';
                    break;
                case 'btb' :
                    api = webServiceBase + 'btb/master/'+p;
                    break;
					
				case 'MS_LEGALITAS_JAMINAN' :
                    api = webServiceBase + 'master/lov_legalitas_jeminan';
                    break;
				case 'MS_DETAIL_LEGALITAS_JAMINAN' :
                    api = webServiceBase + 'master/lov_detail_legalitas_jeminan/'+(p ? p : '');
                    break;
				case 'MS_STATUS_KIOS' :
                    api = webServiceBase + 'master/lov_status_kios';
                    break;
				case 'MS_JENIS_KIOS' :
                    api = webServiceBase + 'master/lov_jenis_kios';
                    break;
                    
                default:
                    api = '';
                    break;
            }
            
            $http({
                method : "GET",
                url : api,
                dataType: 'json',
                headers: { 'Content-Type':'application/json' },
            }).then(function mySucces(R) {
                   
                if (R.data) {
                    if (k==='global' || k==='btb') {
                        $rootScope[p] = R.data;
                    } else if(k==='data_master'){
                        var t = (typeof R.data !== 'undefined') ? R.data : [];
                        for (var kh in t){
                                if (t.hasOwnProperty(kh)) {								
                                    $rootScope[kh] = t[kh];
                                }
                        }
                    } else
                        $rootScope[k] = R.data;
                } else
                    $rootScope[k] = {};

            }, function myError(R) {

                console.log(R.statusText); 
//                globalFunction.ag('danger',[R]); 

            });
            
        },
        
        get_view : function(d){
            
            if (d['gl']) globalFunction.openModalLoading();
            
            $http({
                method : "GET",
                url : d['api'],
                dataType: 'json',
                headers: { 'Content-Type':'application/json' },
            }).then(function mySuccess(R) {
                
                if (d['title']) $rootScope.MODAL_VIEW_TITLE = d['title'];
                
                if (d['fd']) {
                    if (d['collect'])
                        d['collect'](R);
                    else {
                        if (d['type'] == 'tolist' || d['type'] == 'object') 
                            d['scope'][d['fd']] = (typeof R.data !== 'undefined') ? R.data : [];      
                        else
                            d['scope'][d['fd']] = (typeof R.data[0] !== 'undefined') ? R.data[0] : {};
                    }
                        
                } 
                
                var m = globalFunction.openModal('partials/modals/modal-view.html','modal-view','');
                m;
            
                $rootScope.closeModalView = function(){
                    m.close();
                    d['scope'][d['fd']] = {};
                };
                
                if (d['gl']) globalFunction.closeModalLoading();
                
            }, function myError(R) { 
                console.log(R.statusText);  
                globalFunction.ag('danger',[R]); 
                if (d['gl']) globalFunction.closeModalLoading();
            });
            
        },
        
        get_allDataCalonDebiturPerId : function(scope,id){
            
            var api = apiBase + 'prospek/get_detailCalonDebitur/?id='+id;
            
            $http({
                method : "GET",
                url : api,
                dataType: 'json',
                headers: { 'Content-Type':'application/json' },
            }).then(function mySucces(R) {
                
                var t = (typeof R.data.individu !== 'undefined') ? R.data.individu[0] : [];
                
                for (var k in t){
                    if (t.hasOwnProperty(k)) {
                        //console.log("Key is " + k + ", value is " + t[k]);
                        scope[k] = t[k];
                        $rootScope[k] = t[k];
                    }
                }
                scope['DB_PROSPEK_ID'] = id;
                
            }, function myError(R) { 
                console.log(R.statusText); 
                globalFunction.ag('danger',[R]); 
                globalFunction.closeModalLoading();  
            });
            
            getDataStatusSubmit.e();
			getDataStatusCekSlik.e();/*FZL 20/4/2018*/
            
        },
        
        alamatExe : function(scope){
            
            var t = this;
            this.get_masterData('provinsi');

           /* Load Kabupaten */
            scope.kb = function(p){
                t.get_masterData('kabkot',p);
            };

            /* Load Kecamatan */
            scope.kc = function(p){
                t.get_masterData('kec',p);
            };

             /* Load Kelurahan */
            scope.kl = function(p){
                t.get_masterData('keldes',p);
            };
            
        },
        
        alamatSet : function(d){
            
            var t = this;
            
            d['scope'].$watchGroup(['MS_PROVINSI_ID','MS_KABKOT_ID','MS_KECAMATAN_ID','MS_KELDES_ID'],function(newValue,oldValue) {
                if(newValue) {
                    
                    t.alamatExe(d['scope']);
                    
                    console.log(d['scope']);
                    
                    d['scope'].kb(d['scope'][d['fd']].MS_PROVINSI_ID);
                    d['scope'].kc(d['scope'][d['fd']].MS_KABKOT_ID);
                    d['scope'].kl(d['scope'][d['fd']].MS_KECAMATAN_ID);
                    
                }
            });
            
        },
        
        kantorExe : function(scope){
            
            var t = this;
            this.get_masterData('wilayah');

           /* Load Cabang */
            scope.cb = function(p){
                t.get_masterData('cabang',p);
            };

            /* Load Unit */
            scope.un = function(p){
                t.get_masterData('unit',p);
            };
            
        },
        
        kantorSet : function(d){
            
            var t = this;
            
            d['scope'].$watchGroup(['MS_WILAYAH_ID','MS_KODE_CABANG','MS_KODE_UNIT'],function(newValue,oldValue) {
                if(newValue) {
                    
                    t.kantorExe(d['scope']);
                    
                    d['scope'].cb(d['scope'][d['fd']].MS_WILAYAH_ID);
                    d['scope'].un(d['scope'][d['fd']].MS_KODE_CABANG);
                    
                }
            });
            
        },
		
        kiosExe : function(scope){
            
            var t = this;
            this.get_masterData('MS_LEGALITAS_JAMINAN');					

           /* Load Detail Legalitas Jaminan */
            scope.dlj = function(p){
                t.get_masterData('MS_DETAIL_LEGALITAS_JAMINAN',p);
            };        
            
        },
		
        get_DS : function(d){
            
            globalFunction.openModalLoading();
            
            $http({
                method : "GET",
                url : apiBase + 'survey/get_alldata/?id='+$stateParams.id,
                dataType: 'json',
                headers: { 'Content-Type':'application/json' },
            }).then(function mySuccess(R) {
                
                if (typeof R.data !== 'undefined') {
                    
                    /* Profil & Karakter */
                    
                    R.data.PROFIL.PROFIL_INFO_PRIBADI.MS_MENGENAL_ULAMM_ID = globalFunction.setMultiAnswer({
                                JAWABAN     : R.data.PROFIL.PROFIL_INFO_PRIBADI.MS_MENGENAL_ULAMM_ID,
                                PERTANYAAN  : 'MS_MENGENAL_ULAMM_ID'
                            });
                            
                    R.data.PROFIL.PROFIL_INFO_PRIBADI.MS_REPUTASI_ID = globalFunction.setMultiAnswer({
                                JAWABAN     : R.data.PROFIL.PROFIL_INFO_PRIBADI.MS_REPUTASI_ID,
                                PERTANYAAN  : 'MS_REPUTASI_ID'
                            });
                    
                    /* Kapasitas Usaha */
                    
                    R.data.KAPASITAS_USAHA.KAPASITAS_USAHA_INDEX.MS_HARTA_ID = globalFunction.setMultiAnswer({
                                JAWABAN     : R.data.KAPASITAS_USAHA.KAPASITAS_USAHA_INDEX.MS_HARTA_ID,
                                PERTANYAAN  : 'MS_HARTA_ID'
                            });
                            
                    console.log(R);
                    $rootScope.DS = (typeof R.data !== 'undefined') ? R.data : [];
                    
//                    var A=[], Aa=[], Aaa=[];
//                    
//                    A =  R.data.PROFIL.PROFIL_INFO_PRIBADI.MS_MENGENAL_ULAMM_ID;
//                    
//                    for (var i=0; i<A.length; i++){
//                        if (Aa.indexOf(A[i].MS_JAWABAN_ID) <= -1)
//                            Aa[i] = A[i].MS_JAWABAN_ID;
//                    }
//                   
//                    for (var i=0; i<$rootScope.MS_MENGENAL_ULAMM_ID.length; i++){
//                        if (Aa.indexOf($rootScope.MS_MENGENAL_ULAMM_ID[i].MS_PARA_GLOBAL_DETAIL_ID) > -1) {
//                            Aaa[i] = $rootScope.MS_MENGENAL_ULAMM_ID[i].MS_PARA_GLOBAL_DETAIL_ID;
//                        } else
//                            Aaa[i] = '';    
//                    }    
//                    
//                    R.data.PROFIL.PROFIL_INFO_PRIBADI.MS_MENGENAL_ULAMM_ID = Aaa;
//                    console.log(R.data.PROFIL.PROFIL_INFO_PRIBADI.MS_MENGENAL_ULAMM_ID);
                }
                
                globalFunction.closeModalLoading();
                
            }, function myError(R) { 
                console.log(R.statusText); 
                globalFunction.closeModalLoading();  
                globalFunction.ag('danger',['Error get data survey']); 
            });
            
        },
        
        bulan : function(){
            
//            var A = { 
//                'Januari' : 1,
//                'Februari' : 2,
//                'Maret' : 3,
//                'April' : 4,
//                'Mei' : 5,
//                'Juni' : 6,
//                'Juli' : 7,
//                'Agustus' : 8,
//                'September' : 9,
//                'Oktober' : 10,
//                'November' : 11,
//                'Desember' : 12
//            };
            
             var A = { 
                 1 : 'Januari',
                 2 : 'Februari',
                 3 : 'Maret',
                 4 : 'April',
                 5 : 'Mei',
                 6 : 'Juni',
                 7 : 'Juli',
                 8 : 'Agustus',
                 9 : 'September',
                 10 : 'Oktober',
                 11 : 'November',
                 12 : 'Desember'
            };
            
            return A;
        },
        
        get_DFDE : function(){
            
            globalFunction.openModalLoading();
            
            $http({
                method : "GET",
                url : apiBase + 'fde/get_alldata/?id='+$stateParams.id,
                dataType: 'json',
                headers: { 'Content-Type':'application/json' },
            }).then(function mySuccess(R) {
                
                if (typeof R.data !== 'undefined') {
                    $rootScope.DFDE = (typeof R.data !== 'undefined') ? R.data : [];
                }
                
                globalFunction.closeModalLoading(); 
                
            }, function myError(R) { 
                console.log(R.statusText); 
                globalFunction.closeModalLoading();  
                globalFunction.ag('danger',['Error get data fde']); 
            });
        },
        
        get_DRV : function(){
            
            globalFunction.openModalLoading();
            
            $http({
                method : "GET",
                url : apiBase + 'review/get_alldata/?id='+$stateParams.id,
                dataType: 'json',
                headers: { 'Content-Type':'application/json' },
            }).then(function mySuccess(R) {
                
                if (typeof R.data !== 'undefined') {
                    $rootScope.DRV = (typeof R.data !== 'undefined') ? R.data : [];
                }
                
                globalFunction.closeModalLoading();
                
            }, function myError(R) { 
                console.log(R.statusText); 
                globalFunction.closeModalLoading();  
                globalFunction.ag('danger',['Error get data review']); 
            });
            
        },			
        
        get_DASE : function(){
            
//            globalFunction.openModalLoading();
            
            $http({
                method : "GET",
                url : apiBase + 'review/get_analisasensitivitas/?id='+$stateParams.id,
                dataType: 'json',
                headers: { 'Content-Type':'application/json' },
            }).then(function mySuccess(R) {
                
                if (typeof R.data !== 'undefined') {
                    $rootScope.DASE = (typeof R.data !== 'undefined') ? R.data : [];
                }
                
//                globalFunction.closeModalLoading();  
                
            }, function myError(R) { 
                console.log(R.statusText); 
//                globalFunction.closeModalLoading();  
                globalFunction.ag('danger',['Error get data analisa sensitivitas']); 
            });
            
        },
				
        checkauth : function(){
            
            $http({
                method : "GET",
                url : apiBase+'auth/check',
                dataType: 'json',
                headers: { 'Content-Type':'application/json' }
            }).then(function mySuccess(R) {
                
                if (R.data.STATUS == false && $state.current.name != 'apps') {
                    $state.go('login');
                } else if (R.data.STATUS == true && $state.current.name == 'login') {
                    $state.go('home_');
                }
                
                var homestate = $state.current.name.split('.')[0];
                
                console.log('homestate',homestate);

                if (R.data.POSISI_NAMA == 'AOM' && (homestate == 'prospek' || homestate == 'survey')){
                    if (R.data.MY_PEMBIAYAAN.indexOf($stateParams.id) < 0){
                        
                        // $state.go('home_');
                        // console.log('Working direct');
                        
                    }

                } 
                
                if (R.data.STATUS == true){
                    $rootScope.$storage = $sessionStorage.$default({
                        SESSION_LOGIN : R.data
                    });
                    $rootScope.$storage.SESSION_LOGIN = R.data;
                    console.log('storage', $rootScope.$storage);
                    
                    $rootScope.myFilterWilayah = function(e) {
                        if (typeof $rootScope.$storage.SESSION_LOGIN.CLUSTER.WILAYAH !== 'undefined')
                            return $rootScope.$storage.SESSION_LOGIN.CLUSTER.WILAYAH.indexOf(e.MS_WILAYAH_ID) !== -1;
                    };
                    $rootScope.myFilterCabang = function(e) {
                        if (typeof ($rootScope.$storage.SESSION_LOGIN.CLUSTER.CABANG) !== 'undefined')
                            return $rootScope.$storage.SESSION_LOGIN.CLUSTER.CABANG.indexOf(e.MS_CABANG_KODE) !== -1;
                    };
                    $rootScope.myFilterUnit = function(e) {
                        if (typeof ($rootScope.$storage.SESSION_LOGIN.CLUSTER.UNIT) !== 'undefined')
                            return $rootScope.$storage.SESSION_LOGIN.CLUSTER.UNIT.indexOf(e.MS_UNIT_KODE) !== -1;
                    };
                }
                
            }, function myError(R) { 
                console.log(R.statusText);  
            });
            
        },
        
        logout : function(){
            
            $http({
                method : "GET",
                url : apiBase+'auth/logout',
                dataType: 'json',
                headers: { 'Content-Type':'application/json' }
            }).then(function mySuccess(R) {
               
                if (R.data.STATUS == true)
                    $state.go('login');
                
                delete $rootScope.$storage.SESSION_LOGIN;
                delete $sessionStorage.SESSION_LOGIN;
                    
            }, function myError(R) { 
                console.log(R.statusText);  
            });
            
        },
        
        getProdukDetail : function(d){
            
            this.get({
                gl      : true,
                api     : apiBase+'prospek/get_produkid/?id='+d['id'],
                scope   : d['scope'],
                sn      : 'fdPRDDTL',
                callbacksuccess : function(R){
                   
                    d['scope'][d['sn']]['MS_PRODUK_ID'] = R.data.id;					
					
                    d['scope'][d['sn']]['MS_PRODUK_ID_DESKRIPSI'] = R.data.nama_produk; /*FZL 16/4/2018*/
                    
                    if (d['t'] == 'onchange')
                        d['scope'][d['sn']]['MS_TENOR'] = R.data.tenor_mid;
                    
                    d['scope'][d['sn']]['MS_TENOR_MIN'] = R.data.tenor_min;
                    d['scope'][d['sn']]['MS_TENOR_MAX'] = R.data.tenor_max;
                    d['scope'][d['sn']]['MS_TENOR_MID'] = R.data.tenor_mid;
                    
                    if (d['t'] == 'onchange')
                        d['scope'][d['sn']]['MS_PLAFOND'] = R.data.plafon_mid;
                    
                    d['scope'][d['sn']]['MS_PLAFOND_MIN'] = R.data.plafon_min;
                    d['scope'][d['sn']]['MS_PLAFOND_MAX'] = R.data.plafon_max;
                    d['scope'][d['sn']]['MS_PLAFOND_MID'] = R.data.plafon_mid;
                    
                    if (d['t'] == 'onchange')
                        d['scope'][d['sn']]['MS_BUNGA_PERBULAN'] = R.data.bunga_mid;
                    
                    d['scope'][d['sn']]['MS_BUNGA_PERBULAN_MIN'] = R.data.bunga_min;
                    d['scope'][d['sn']]['MS_BUNGA_PERBULAN_MAX'] = R.data.bunga_max;
                    d['scope'][d['sn']]['MS_BUNGA_PERBULAN_MID'] = R.data.bunga_mid;
                    
                    
                    if (d['t'] == 'onchange')
                        d['scope'][d['sn']]['PR_JANGKA_WAKTU'] = R.data.tenor_mid;
                    if (d['t'] == 'onchange')
                        d['scope'][d['sn']]['PR_RENCANA_PLAFOND'] = R.data.plafon_mid;
                    
                }
            });
            
        },
        
        getProgramDetail : function(d){
            
            this.get({
                gl      : true,
                api     : apiBase+'prospek/get_programid/?id='+d['id'],
                scope   : d['scope'],
                sn      : 'fdPRGDTL',
                callbacksuccess : function(R){
                   
                    d['scope'][d['sn']]['MS_PROGRAM_ID'] = R.data.id;
                    
                    /* if (d['t'] != 'onchange') FZL 18/4/2018 karena bunga jadi 30 persen trus
                        d['scope'][d['sn']]['MS_BUNGA_PERBULAN'] = R.data.tenor_mid; */
                    
                    d['scope'][d['sn']]['MS_PROGRAM_ID_DESKRIPSI'] = R.data.nama_program;
                    
                    if (d['t'] == 'onchange'){
                        if (d['scope'][d['sn']]['MS_TENOR'] < R.data.tenor_min || d['scope'][d['sn']]['MS_TENOR'] > R.data.tenor_max){
                            d['scope'][d['sn']]['MS_TENOR'] = R.data.tenor_mid;
                        }
                    }
                    d['scope'][d['sn']]['MS_TENOR_MIN'] = R.data.tenor_min;
                    d['scope'][d['sn']]['MS_TENOR_MAX'] = R.data.tenor_max;
                    d['scope'][d['sn']]['MS_TENOR_MID'] = R.data.tenor_mid;
                    
                    if (d['t'] == 'onchange'){
                        if (d['scope'][d['sn']]['MS_PLAFOND'] < R.data.plafon_min || d['scope'][d['sn']]['MS_PLAFOND'] > R.data.plafon_max){
                            d['scope'][d['sn']]['MS_PLAFOND'] = R.data.plafon_mid;
                        }
                    }
                    d['scope'][d['sn']]['MS_PLAFOND_MIN'] = R.data.plafon_min;
                    d['scope'][d['sn']]['MS_PLAFOND_MAX'] = R.data.plafon_max;
                    d['scope'][d['sn']]['MS_PLAFOND_MID'] = R.data.plafon_mid;
                    
                    if (d['t'] == 'onchange'){
                        if (d['scope'][d['sn']]['MS_BUNGA_PERBULAN'] < R.data.bunga_min || d['scope'][d['sn']]['MS_BUNGA_PERBULAN'] > R.data.bunga_max){
                            d['scope'][d['sn']]['MS_BUNGA_PERBULAN'] = R.data.bunga_mid;
                        }
                    }
                    d['scope'][d['sn']]['MS_BUNGA_PERBULAN_MIN'] = R.data.bunga_min;
                    d['scope'][d['sn']]['MS_BUNGA_PERBULAN_MAX'] = R.data.bunga_max;
                    d['scope'][d['sn']]['MS_BUNGA_PERBULAN_MID'] = R.data.bunga_mid;
                    
                    if (d['t'] == 'onchange')
                        d['scope'][d['sn']]['PR_JANGKA_WAKTU'] = R.data.tenor_mid;
                    if (d['t'] == 'onchange')
                        d['scope'][d['sn']]['PR_RENCANA_PLAFOND'] = R.data.plafon_mid;
                    
                    
                }
            });
            
        },
        
        getCalculateProdukProgram : function(d){
            
            this.get({
                gl      : true,
                api     : apiBase+'prospek/get_calculate_produk_program/?id_produk='+d['id_produk']+'&id_program='+d['id_program']+'&id_pembiayaan='+d['id_pembiayaan'],
                scope   : d['scope'],
                sn      : 'fdPRGDTL',
                callbacksuccess : function(R){
                    
                    if (!R.data.error) {
                        
                        R.data = R.data[0];
                    
                        d['scope'][d['sn']]['MS_PRODUK_ID'] = R.data.id;					

                        d['scope'][d['sn']]['MS_PRODUK_ID_DESKRIPSI'] = R.data.nama_produk;

                        d['scope'][d['sn']]['MS_PROGRAM_ID'] = R.data.program_id;

                        d['scope'][d['sn']]['MS_PROGRAM_ID_DESKRIPSI'] = R.data.nama_program;

                        if (d['t'] == 'onchange'){
                            if (d['scope'][d['sn']]['MS_TENOR'] < R.data.tenor_min || d['scope'][d['sn']]['MS_TENOR'] > R.data.tenor_max){
                                d['scope'][d['sn']]['MS_TENOR'] = R.data.tenor_mid;
                            }
                        }
                        d['scope'][d['sn']]['MS_TENOR_MIN'] = R.data.tenor_min;
                        d['scope'][d['sn']]['MS_TENOR_MAX'] = R.data.tenor_max;
                        d['scope'][d['sn']]['MS_TENOR_MID'] = R.data.tenor_mid;

                        if (d['t'] == 'onchange'){
                            if (d['scope'][d['sn']]['MS_PLAFOND'] < R.data.plafon_min || d['scope'][d['sn']]['MS_PLAFOND'] > R.data.plafon_max){
                                d['scope'][d['sn']]['MS_PLAFOND'] = R.data.plafon_mid;
                            }
                        }
                        d['scope'][d['sn']]['MS_PLAFOND_MIN'] = R.data.plafon_min;
                        d['scope'][d['sn']]['MS_PLAFOND_MAX'] = R.data.plafon_max;
                        d['scope'][d['sn']]['MS_PLAFOND_MID'] = R.data.plafon_mid;

                        if (d['t'] == 'onchange'){
                            if (d['scope'][d['sn']]['MS_BUNGA_PERBULAN'] < R.data.bunga_min || d['scope'][d['sn']]['MS_BUNGA_PERBULAN'] > R.data.bunga_max){
                                d['scope'][d['sn']]['MS_BUNGA_PERBULAN'] = R.data.bunga_mid;
                            }
                        }
                        d['scope'][d['sn']]['MS_BUNGA_PERBULAN_MIN'] = R.data.bunga_min;
                        d['scope'][d['sn']]['MS_BUNGA_PERBULAN_MAX'] = R.data.bunga_max;
                        d['scope'][d['sn']]['MS_BUNGA_PERBULAN_MID'] = R.data.bunga_mid;

                        if (d['t'] == 'onchange')
                            d['scope'][d['sn']]['PR_JANGKA_WAKTU'] = R.data.tenor_mid;
                        if (d['t'] == 'onchange')
                            d['scope'][d['sn']]['PR_RENCANA_PLAFOND'] = R.data.plafon_mid;
                        
                        d['scope'][d['sn']]['MS_JENIS_PRODUK_ID'] = parseInt(R.data.tipe);
                        
                        d['scope'][d['sn']]['MS_CCR'] = parseInt(R.data.ccr);
                        
                        
                        for(var jp=0; jp<$rootScope.MS_JENIS_PRODUK_ID.length; jp++){
                            if ($rootScope.MS_JENIS_PRODUK_ID[jp].MS_PARA_GLOBAL_DETAIL_ID == parseInt(R.data.tipe)) {
                                d['scope'][d['sn']]['MS_JENIS_PRODUK_ID_DESKRIPSI'] = $rootScope.MS_JENIS_PRODUK_ID[jp].MS_DESKRIPSI;
                            }
                        }
                        
                        if (parseInt(R.data.tipe) != 474)
                            d['scope'][d['sn']]['MS_JENIS_TOP_UP_ID'] = null;
                    
                    } else {
                        
                        if (d['scope'][d['sn']]['MS_PRODUK_ID'] && d['scope'][d['sn']]['MS_PROGRAM_ID']){
                            d['scope'][d['sn']]['MS_PRODUK_ID'] = null;					
                            d['scope'][d['sn']]['MS_PRODUK_ID_DESKRIPSI'] = null;
                            d['scope'][d['sn']]['MS_PROGRAM_ID'] = null;
                            d['scope'][d['sn']]['MS_PROGRAM_ID_DESKRIPSI'] = null;
                            globalFunction.ag('danger',['Produk dan program ini tidak tersedia, silahkan pilih produk dan program lain']);
                        }
                            
                        
                    }
                }
            });
            
        }
        
    };
    
});

App.factory('globalFunction',function($rootScope,$uibModal){
    
    return {
        serializeObj : function(obj) {
            var result = [];

            for (var property in obj)
                result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

            return result.join("&");
        },
        
        ag : function(type,msg){
            
            $rootScope.agShow = true;
            $rootScope.agType = type;
            $rootScope.agMsg = msg;
            
            setTimeout(function() {
                $rootScope.agShow = false;
                $rootScope.$digest();
            }, 2000);
            
        },
        
        openModal : function(page,cls,ctrl,scope){
            return $uibModal.open({
                animation: true,
                templateUrl: page,
                backdrop: 'static',
                keyboard: false,
                windowClass: cls,
                controller: ctrl,
                scope: scope
            });       
        },
        
        scopeChoice : function(){
            
            $rootScope.jenis_alamat = [
                {k : 'KTP' , v : 0},
                {k : 'Domisili' , v : 0},
            ];
            
        },
        
        openModalLoading : function(){
            
//            var m = this.openModal('partials/modals/modal-loading.html','modal-loading','');
//            
//            $rootScope.closeModalLoading = function(){
//                m.close();
//            };
            
        },
        
        closeModalLoading : function(){
            
//            $rootScope.closeModalLoading();
            
        },

        collectObject : function() {
          var ret = {};
          var len = arguments.length;
          for (var i=0; i<len; i++) {
            for (p in arguments[i]) {
              if (arguments[i].hasOwnProperty(p)) {
                ret[p] = arguments[i][p];
              }
            }
          }
          return ret;
        },
        
        checkboxTrue : function(d){
            
            if (d['value'].indexOf(d['array']))
                return true;
            else
                return false;
            
        },
        
        cleanArray : function(actual){
            
            var newArray = new Array();
            for (var i = 0; i < actual.length; i++) {
              if (actual[i]) {
                newArray.push(actual[i]);
              }
            }
            return newArray;
            
        },
        
        setMultiAnswer : function(d){
            
            var A=[], Aa=[], Aaa=[];
                    
            A = d['JAWABAN'];

            for (var i=0; i<A.length; i++){
                if (Aa.indexOf(A[i].MS_JAWABAN_ID) <= -1)
                    Aa[i] = A[i].MS_JAWABAN_ID;
            }

            for (var i=0; i<$rootScope[d['PERTANYAAN']].length; i++){
                if (Aa.indexOf($rootScope[d['PERTANYAAN']][i].MS_PARA_GLOBAL_DETAIL_ID) > -1) {
                    Aaa[i] =$rootScope[d['PERTANYAAN']][i].MS_PARA_GLOBAL_DETAIL_ID;
                } else
                    Aaa[i] = '';    
            }    
            console.log(Aaa);
            return Aaa;
            
        },
        
        setCheckbox : function(d){
            
            var A=[], Aa=[], Aaa=[];
                    
            A = d['JAWABAN'];
            console.log('JAWABAN', A);
            
            if (A != undefined){
                for (var i=0; i<A.length; i++){
                    if (Aa.indexOf(A[i]) <= -1)
                        Aa[i] = A[i];
                }

                for (var i=0; i<$rootScope[d['PERTANYAAN']].length; i++){
                    if (Aa.indexOf($rootScope[d['PERTANYAAN']][i].MS_PARA_GLOBAL_DETAIL_ID) > -1) {
                        Aaa[i] = $rootScope[d['PERTANYAAN']][i].MS_PARA_GLOBAL_DETAIL_ID;
                    } else
                        Aaa[i] = '';    
                }    
                console.log(Aaa);
                return Aaa;
            } else {
                return [];
            }
            
        },
        
        formValidation : function(d){
            
            var t = this;
            d['scope'].formValidMsg = [];
            
            for (var i=0; i < d['field'].length; i++){				
                if (!d['scope'][d['form']][d['field'][i]['fn']] && d['scope'][d['form']][d['field'][i]['fn']]!=0) { /*FZL penambahan && !=0 */	
                    d['scope'].formValidMsg.push(d['field'][i]['fk'] + ' harus diisi');
                }
            }            			
			
            if (d['callback']) d['callback']();
            
            console.log(d['scope'].formValidMsg);

            if (d['scope'].formValidMsg.length > 0) {
                //$scope.formValidStatus = true;
                t.ag('danger',d['scope'].formValidMsg);
                return false;
            } else {
                return true;
            }
            
        },
        
        VDPmultiselect : function(scope){
            
            scope.moveItem = function(type, items, from, to) {
                
                if (type === 'ALL') {
                    
                    angular.forEach(from, function(item) {
                        if (typeof(item.checked) !== 'undefined'){
                            console.log(item.checked);
                            delete item.checked;
                        }
                        to.push(item);
                    });
                    from.length = 0;
                    from.splice(0, from.length);
                    
                } else {
                    
                    angular.forEach(items, function(item) {
                        var idx = from.indexOf(item);
                        from.splice(idx, 1);
                        if (typeof(item.checked) !== 'undefined'){
                            console.log(item.checked);
                            delete item.checked;
                        }
                        to.push(item);
                    });
                    
                }
                
                if (typeof(items) !== 'undefined'){
                    items.length = 0;
                    items.splice(0, items.length);
                }
                
            };
            
        },
        
        fileValidation : function(d){
            
            var fileType = d['filename'].split(".").pop().toUpperCase();
            var validFormat = d['validformat'].map(function(x){ return x.toUpperCase(); });
            
            if (validFormat.indexOf(fileType) == -1){
                alert('File tidak valid');
                if (d['callbacknotvalid']) d['callbacknotvalid'] ();
                return false;
            } else {
                return true;
            } 
            
        },
        
        calculateAge : function(dateString){

            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
              age--;
            }
            console.log(age);
            return age;
            
        },
        
        removeArray : function(arr) {
            var what, a = arguments, L = a.length, ax;
            while (L > 1 && arr.length) {
                what = a[--L];
                while ((ax= arr.indexOf(what)) !== -1) {
                    arr.splice(ax, 1);
                }
            }
            return arr;
        },
        
        buildForm : function(obj){
            var nO = [], i = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) nO.push(i++);
            }
            return nO.length > 0 ? nO : [0];
        },
        
        actionBTBSaved : function(){
            
            $rootScope.closemodalBTB();
            
        },
        
        formatDate : function(date) {
            var monthNames = [
              "January", "February", "March",
              "April", "May", "June", "July",
              "August", "September", "October",
              "November", "December"
            ];

            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return day + ' ' + monthNames[monthIndex] + ' ' + year;
        }

    };
    
});

App.factory('httpInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
        var loadingCount = 0;

        return {
            request: function (config) {
                if(++loadingCount === 1) $rootScope.$broadcast('loading:progress');
                return config || $q.when(config);
            },

            response: function (response) {
                if(--loadingCount === 0) $rootScope.$broadcast('loading:finish');
                return response || $q.when(response);
            },

            responseError: function (response) {
                if(--loadingCount === 0) $rootScope.$broadcast('loading:finish');
                return $q.reject(response);
            }
        };
    }
]);

App.factory('Excel',function($window){//FZL
	var uri='data:application/vnd.ms-excel;base64;,',
		template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
		base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
		format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
	return {
		tableToExcel:function(tableId,worksheetName){
			var table=angular.element(document.querySelector(tableId)),
				ctx={worksheet:worksheetName,table:table[0].innerHTML},
				href=uri+base64(format(template,ctx));
			return href;
		}
	};
})
/*======================== DIRECTIVE =========================*/

App.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);

App.directive('eatClickIf', ['$parse', '$rootScope',
  function($parse, $rootScope) {
    return {
      // this ensure eatClickIf be compiled before ngClick
      priority: 100,
      restrict: 'A',
      compile: function($element, attr) {
        var fn = $parse(attr.eatClickIf);
        return {
          pre: function link(scope, element) {
            var eventName = 'click';
            element.on(eventName, function(event) {
              var callback = function() {
                if (fn(scope, {$event: event})) {
                  // prevents ng-click to be executed
                  event.stopImmediatePropagation();
                  // prevents href 
                  event.preventDefault();
                  return false;
                }
              };
              if ($rootScope.$$phase) {
                scope.$evalAsync(callback);
              } else {
                scope.$apply(callback);
              }
            });
          },
          post: function() {}
        }
      }
    }
  }
]);

App.directive('myOnKeyDownCall', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {            
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
        });
    };
});

App.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value);
      });
    }
  };
});

App.directive('convertToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(val) {
        return val != null ? parseInt(val, 10) : null;
      });
      ngModel.$formatters.push(function(val) {
        return val != null ? '' + val : null;
      });
    }
  };
});

App.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;

          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
          
          scope.$watch(attrs.fileModel, function(newValue) {
            element.val(newValue);
          });

       }
    };
 }]);
 
App.directive('title', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      link: function() {

        var listener = function(event, toState) {

          $timeout(function() {
            $rootScope.title = (toState.data && toState.data.pageTitle) 
            ? toState.data.pageTitle 
            : 'Default title';
          });
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  }
]);

App.directive('menuAlias', function($compile,$rootScope) {
    return {
        link: function(scope, element, attrs) {
            
            if ($rootScope.$storage.SESSION_LOGIN.ROLE_MENU.indexOf(attrs.menuAlias) == -1) {
                element[0].outerHTML = '';
                $compile(element.contents())(scope);
            }
            
        }
    };
});

App.directive("noHp", function($parse) {
  return {
    compile: function(tElm,tAttrs){
        return function (scope,elm){
//            elm.attr('maxlength','14'); 
//            elm.attr('onkeypress','return event.charCode >= 48 && event.charCode <= 57'); 
            elm.attr('restrict','reject');
            elm.attr('mask','9999999999999');
        };
    }
  };
});

App.directive("kodePos", function($parse) {
  return {
    compile: function(tElm,tAttrs){
        return function (scope,elm){
//            elm.attr('maxlength','6'); 
//            elm.attr('onkeypress','return event.charCode >= 48 && event.charCode <= 57'); 
            elm.attr('restrict','reject');
            elm.attr('mask','999999');
        };
    }
  };
});

App.directive('iframeDirective', ['$sce', function($sce) {
    return {
        restrict: 'E',
        template: '<iframe src="{{ trustedUrl }}" frameborder="0" allowfullscreen></iframe>',
        link: function(scope, element, attr) {
            scope.trustedUrl = $sce.trustAsResourceUrl(attr.trustedUrl);
        }
    };
}]);
 

 
/*====================== SERVICES ============================*/
    
App.service('postDokumen',function ($http,globalFunction,apiBase,getKelengkapanDataById,$rootScope) {
        this.uploadFileToUrl = function(data,scope,callbacksuccess){
            var fd = new FormData();
			var type_doc = '';
            if (typeof data.PR_INDIVIDU_DOKUMEN_ID !== 'undefined' && data.PR_INDIVIDU_DOKUMEN_ID)
                fd.append('PR_INDIVIDU_DOKUMEN_ID', data.PR_INDIVIDU_DOKUMEN_ID);
            fd.append('DB_PROSPEK_ID', data.DB_PROSPEK_ID);
//            if (typeof data.PR_NOMOR_DOKUMEN !== 'undefined')
                fd.append('PR_NOMOR_DOKUMEN', data.PR_NOMOR_DOKUMEN);
//            if (typeof data.MS_JENIS_DOKUMEN_ID !== 'undefined')
                fd.append('MS_JENIS_DOKUMEN_ID', data.MS_JENIS_DOKUMEN_ID);
//            if (typeof data.PR_DOKUMEN !== 'undefined')
                fd.append('PR_DOKUMEN', data.PR_DOKUMEN);						
			
			/*tambahan FZL start*/
			if (typeof data.DB_HEADER_ID != 'undefined')
                fd.append('DB_HEADER_ID', data.DB_HEADER_ID);
            if (typeof data.DB_HEADER != 'undefined')
                fd.append('DB_HEADER', data.DB_HEADER);
			if (typeof data.TYPE_DOKUMEN != 'undefined')
                type_doc = data.TYPE_DOKUMEN;	
			if (typeof data.MS_JENIS_KTP_ID != 'undefined')
				fd.append('MS_JENIS_KTP_ID', data.MS_JENIS_KTP_ID);			
			/*FZL end*/
			
			console.log(type_doc);
			
            console.log(fd);
            
            if (globalFunction.fileValidation({
                filename    : data.PR_DOKUMEN.name,
                validformat : ['pdf','jpg','jpeg','png']
            }) == false) { return false };
            
            var u = apiBase + 'prospek/post_dokumen';
//            var u = 'http://192.168.1.252/PNM/api/v1/prospek/set_individu_dokumen';
            return $http({
                url: u,
                method: 'POST',
                data: fd,
//                headers: { 'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function(R){
//                R = JSON.parse(R);
                if (typeof R.status && R.status == 'Success') {
                    globalFunction.ag('success',['Data berhasil disimpan']);
					
					/*tambahan FZL start*/
					if (type_doc == 'FOTO'){
						scope.getDokumenListFoto(data.DB_PROSPEK_ID);									
						scope.formDataSurveyDokumen = {};
						getKelengkapanDataById.e({
							scope   : scope,
							id      : data.DB_PROSPEK_ID,
							type    : 'survey'
						});
					}else{
					/*tambahan FZL end*/
						scope.getDokumenList(data.DB_PROSPEK_ID);                    
						scope.formDataDokumen = {};
						getKelengkapanDataById.e({
							scope   : scope,
							id      : data.DB_PROSPEK_ID,
							type    : 'prospek'
						});
					}					
                    callbacksuccess(R);
                } else {
                    globalFunction.ag('danger',['Data gagal disimpan']);
                }
                console.log(R);
                globalFunction.closeModalLoading();
            }).error(function(R){
                console.log(R);
                globalFunction.ag('danger',[R]);
                globalFunction.closeModalLoading();
            });
        };
    });
    
App.service('postDataKeluarga',function ($http,globalFunction,apiBase,getKelengkapanDataById,$rootScope,$stateParams) {
        this.uploadFileToUrl = function(data,scope){
            
            var fd = new FormData();
            if (typeof data.PR_INDIVIDU_DOKUMEN_ID != 'undefined')
                fd.append('PR_INDIVIDU_DOKUMEN_ID', data.PR_INDIVIDU_DOKUMEN_ID);
            fd.append('DB_PROSPEK_ID', data.DB_PROSPEK_ID);
            fd.append('PR_NO_KK', data.PR_NO_KK);
            fd.append('PR_JML_ANAK', data.PR_JML_ANAK.toString());
            fd.append('PR_DOKUMEN', data.PR_DOKUMEN);
            console.log(fd);								
			
            return $http({
                url: apiBase + 'prospek/post_datakeluarga',
                method: 'POST',
                data: fd,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            }).success(function(R){
//                R = JSON.parse(R);
                if (typeof R.status && R.status == 'Success') {
                    globalFunction.ag('success',['Data berhasil disimpan']);
                    // getKelengkapanDataById.e({
                        // scope   : scope,
                        // id      : data.DB_PROSPEK_ID,
                        // type    : 'prospek'
                    // });
					getKelengkapanDataById.e({
						scope   : $rootScope,
						id      : $stateParams.id,
						type    : 'prospek'
					});					
                } else {
                    globalFunction.ag('danger',['Data gagal disimpan']);
                }
                console.log(R.status);
                globalFunction.closeModalLoading();
            }).error(function(){
                globalFunction.ag('danger',['Error__:D']);
                globalFunction.closeModalLoading();
            });									
        };
    });
    
App.service('getKelengkapanData',function($http,apiBase,globalFunction,$rootScope){
    
    this.e = function(D){ //{scope: $scope, PR_INDIVIDU_ID : 'number'}
        
        if (D['type'] == 'prospek') {
            
            $http({
                method      : "GET",
                url         : apiBase+'prospek/get_prospekperindividu/?id='+D['PR_INDIVIDU_ID'],
                dataType    : 'json',
                headers     : { 'Content-Type':'application/json' }
            }).then(function mySuccess(R) {

                for (var i=0; i<R.data.length; i++)
                    D['scope'].prKD({PRID : R.data[i].DB_PROSPEK_ID, DATA : R.data, I : i});

            }, function myError(R) {  
                console.log(R.statusText); 
                globalFunction.ag('danger',[R]); 
                globalFunction.closeModalLoading();  
            });

            D['scope'].prKD = function(d){
                $http({
                    method      : "GET",
                    url         : apiBase+'prospek/get_kelengkapandata/?id='+d['PRID'],
                    dataType    : 'json',
                    headers     : { 'Content-Type':'application/json' }
                }).then(function mySuccess(R) {

                    R.data.PERCENTASE_FILL_DATA_PROSPEK = R.data.PERCENTASE_FILL_DATA_PROSPEK.toFixed(0);

                    D['scope'].prList = d['DATA'];
                    D['scope'].prList[d['I']]['KELENGKAPAN_DATA'] = R.data;
                    

    //                D['scope'].prList[d['I']]['KELENGKAPAN_DATA']['PROGRESSBAR_TYPE'] = 
                    console.log(D['scope'].prList);

                }, function myError(R) {
                    console.log(R.statusText); 
                    globalFunction.ag('danger',[R]); 
                    globalFunction.closeModalLoading();  
                });
            };
            
        } else {
            
            $http({
                method      : "GET",
                url         : apiBase+'survey/get_listperid/?id='+D['PR_INDIVIDU_ID'],
                dataType    : 'json',
                headers     : { 'Content-Type':'application/json' }
            }).then(function mySuccess(R) {

                for (var i=0; i<R.data.length; i++)
                    D['scope'].svKD({PRID : R.data[i].DB_PROSPEK_ID, DATA : R.data, I : i});

            }, function myError(R) {  
                console.log(R.statusText); 
                globalFunction.ag('danger',[R]); 
                globalFunction.closeModalLoading();  
            });
            
            D['scope'].svKD = function(d){
                $http({
                    method      : "GET",
                    url         : apiBase+'survey/get_kelengkapandata/?id='+d['PRID'],
                    dataType    : 'json',
                    headers     : { 'Content-Type':'application/json' }
                }).then(function mySuccess(R) {

                    R.data.PERCENTAGE.TOTAL = R.data.PERCENTAGE.TOTAL.toFixed(0);

                    D['scope'].svList = d['DATA'];
                    D['scope'].svList[d['I']]['KELENGKAPAN_DATA'] = R.data;

                    console.log(D['scope'].svList);

                }, function myError(R) { 
                    console.log(R.statusText); 
                    globalFunction.ag('danger',[R]); 
                    globalFunction.closeModalLoading();  
                });
            };
            
        }
        
        D['scope'].types = function(v){
            
            var type;
            
            if (v <= 100) {
                type = 'info';
            }
            
            if (v <= 80) {
                type = 'success';
            }
            
            if (v <= 50) {
                type = 'warning';
            }
            
            if (v <= 25) {
                type = 'danger';
            }
            
            return type;
        };
        
    };
    
});

App.service('getKelengkapanDataById', function($http,apiBase,globalFunction){
    
    this.e = function(D){ // { scope : {SCOPE}, id : {PROSPEK_ID} }
        
        var url;
        
        if (D['type'] == 'survey')
            url = apiBase+'survey/get_kelengkapandata/?id='+D['id'];
        else
            url = apiBase+'prospek/get_kelengkapandata/?id='+D['id'];
        
        $http({
            method      : "GET",
            url         : url,
            dataType    : 'json',
            headers     : { 'Content-Type':'application/json' }
        }).then(function mySuccess(R) {
            
            D['scope'].KELENGKAPAN_DATA = R.data;
            
        }, function myError(R) { 
            console.log(R.statusText); 
            globalFunction.ag('danger',[R]); 
            globalFunction.closeModalLoading();  
        });
        
        
        D['scope'].types = function(v){
            
            var type;
            
            if (v <= 100) {
                type = 'info';
            }
            
            if (v <= 80) {
                type = 'success';
            }
            
            if (v <= 50) {
                type = 'warning';
            }
            
            if (v <= 25) {
                type = 'danger';
            }
            
            return type;
        };
        
    };
    
});
    
App.service('postDOC',function ($http,globalFunction,apiBase,getKelengkapanDataById,$rootScope,$stateParams) {
        this.e = function(data,scope,callbacksuccess){
            globalFunction.openModalLoading();
            console.log(data);
            var fd = new FormData();
            if (typeof data.PR_INDIVIDU_DOKUMEN_ID != 'undefined')
                fd.append('PR_INDIVIDU_DOKUMEN_ID', data.PR_INDIVIDU_DOKUMEN_ID);
            if (typeof data.DB_PROSPEK_ID != 'undefined')
                fd.append('DB_PROSPEK_ID', data.DB_PROSPEK_ID);
            if (typeof data.MS_JENIS_DOKUMEN_ID != 'undefined')
                fd.append('MS_JENIS_DOKUMEN_ID', data.MS_JENIS_DOKUMEN_ID);
            if (typeof data.MS_PEMILIK_DOKUMEN_ID != 'undefined')
                fd.append('MS_PEMILIK_DOKUMEN_ID', data.MS_PEMILIK_DOKUMEN_ID);
            if (typeof data.PR_NOMOR_DOKUMEN != 'undefined')
                fd.append('PR_NOMOR_DOKUMEN', data.PR_NOMOR_DOKUMEN);
            if (typeof data.PR_DOKUMEN != 'undefined')
                fd.append('PR_DOKUMEN', data.PR_DOKUMEN);
            if (typeof data.DB_HEADER_ID != 'undefined')
                fd.append('DB_HEADER_ID', data.DB_HEADER_ID);
            if (typeof data.DB_HEADER != 'undefined')
                fd.append('DB_HEADER', data.DB_HEADER);
            
            if (globalFunction.fileValidation({
                filename    : data.PR_DOKUMEN.name,
                validformat : ['pdf','jpg','jpeg','png']
            }) == false) { return false };
            
            var u = apiBase + 'survey/post_dokumen';
            return $http({ 
                url: u, method: 'POST', data: fd, dataType: 'text', headers: { 'Content-Type': undefined}, transformRequest: angular.identity
            }).success(function(R){

				getKelengkapanDataById.e({
					scope   : $rootScope,
					id      : $stateParams.id,
					type    : 'survey'
				});
                
                var E = function(){
                    if (data.DB_HEADER == 'PEMBIAYAAN'){
                        scope.getlistPDKDP(data.DB_PROSPEK_ID);
                        scope.fdPDKDP = {};
                    }
                    if (data.DB_HEADER == 'AGUNAN'){
                        scope.getlistDAS(data.DB_PROSPEK_ID);
                        scope.fdDAS = {};
                    }
                    if (data.DB_HEADER == 'RAB'){
                        scope.getlistDRAB(data.DB_PROSPEK_ID);
                        scope.fdDRAB = {};
                    }
                };
                
                if (R.status == '200' && typeof R.data.status && R.data.status == 'Success') {
                    globalFunction.ag('success',['Data berhasil disimpan']);
                    E();
                    callbacksuccess(R);
                } else if (typeof R.status && R.status == 'Success'){
                    globalFunction.ag('success',['Data berhasil disimpan']);
                    E();
                    callbacksuccess(R);
                } else {
                    globalFunction.ag('danger',['Data gagal disimpan']);
                }
                console.log(R);
                globalFunction.closeModalLoading();
            });
        };
    });
    
App.service('postProspekStatus',function($http,globalFunction,apiBase,$stateParams,getDataStatusSubmit,$location,$state){
    
    this.e = function(id){
        
        globalFunction.openModalLoading();
        var u = apiBase + 'prospek/post_status';
        
        var fd = new FormData();
        fd.append('DB_PROSPEK_ID', id);
        
        $http({ 
            url: u, method: 'POST', data: fd, dataType: 'text', headers: { 'Content-Type': undefined}, transformRequest: angular.identity
        }).success(function(R){
            if ( R.status == 'Success') {
                globalFunction.ag('success',['Data berhasil disimpan']);
                $state.go('survey.informasi.index', { id: $stateParams.id });
                getDataStatusSubmit.e();
            } else {
                globalFunction.ag('danger',['Data gagal disimpan']);
            }
            console.log(R);
            globalFunction.closeModalLoading();
        }).error(function(){
            globalFunction.ag('danger',['Error__']);
            globalFunction.closeModalLoading();
        });
        
        return false;
        
    };
    
});

App.service('postSurveyStatus',function($http,globalFunction,apiBase,$stateParams,getDataStatusSubmit){
    
    this.e = function(id){
        
        globalFunction.openModalLoading();
        var u = apiBase + 'survey/post_status';
        
        var fd = new FormData();
        fd.append('DB_PROSPEK_ID', id);
        
        $http({ 
            url: u, method: 'POST', data: fd, dataType: 'text', headers: { 'Content-Type': undefined}, transformRequest: angular.identity
        }).success(function(R){
            if ( R.DB_STATUS.status == 'Success') {
                globalFunction.ag('success',['Data berhasil disimpan']);
                getDataStatusSubmit.e();
            } else {
                globalFunction.ag('danger',['Data gagal disimpan',R.DB_STATUS.message]);
            }
            console.log(R);
            globalFunction.closeModalLoading();
        }).error(function(){
            globalFunction.ag('danger',['Error__']);
            globalFunction.closeModalLoading();
        });
        
    };
    
});

App.service('postDbIndividuStatus',function($http,globalFunction,apiBase,$stateParams,getDataStatusSubmit){
    
    this.e = function(id,status,sub_status){
        
        globalFunction.openModalLoading();
        var u = apiBase + 'globalclass/set_status';
        
        var fd = new FormData();
        fd.append('DB_PROSPEK_ID', id);
        fd.append('DB_STATUS', status);
        fd.append('DB_SUB_STATUS', sub_status);
        
        $http({ 
            url: u, method: 'POST', data: fd, dataType: 'text', headers: { 'Content-Type': undefined}, transformRequest: angular.identity
        }).success(function(R){
            console.log(R);
            if ( R.status == true) {
                globalFunction.ag('success',['Data berhasil disimpan']);
                getDataStatusSubmit.e();
            } else {
                globalFunction.ag('danger',['Data gagal disimpan',R.DB_STATUS.message]);
            }
            console.log(R);
            globalFunction.closeModalLoading();
        }).error(function(){
            globalFunction.ag('danger',['Error__']);
            globalFunction.closeModalLoading();
        });
        
    };
    
});

App.service('postLKKUulang',function($http,globalFunction,apiBase,$stateParams,getDataStatusSubmit,$state,modalService){
    
    this.e = function(id){
        
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'LKKU Ulang',
            headerText: 'LKKU Ulang',
            bodyText: 'Apakah anda yakin untuk melakukan LKKU Ulang ?'
        }).then(function (result) {

            globalFunction.openModalLoading();
            var u = apiBase + 'globalclass/set_lkku_ulang';

            var fd = new FormData();
            fd.append('DB_PROSPEK_ID', id);

            $http({ 
                url: u, method: 'POST', data: fd, dataType: 'text', headers: { 'Content-Type': undefined}, transformRequest: angular.identity
            }).success(function(R){
                console.log(R);
                if ( R.status == true && R.DB_PROSPEK_ID_NEW != 'ERROR') {
                    globalFunction.ag('success',['SUkses LKKU ulang']);
                    $state.go('survey.informasi.index', { id: R.DB_PROSPEK_ID_NEW });
    //                getDataStatusSubmit.e();
                    console.log('Prospek New',R.DB_PROSPEK_ID_NEW);
                } else {
                    globalFunction.ag('danger',['Gagal LKKU ulang']);
                }
                console.log(R);
                globalFunction.closeModalLoading();
            }).error(function(){
                globalFunction.ag('danger',['Error__']);
                globalFunction.closeModalLoading();
            });

        });
        
    };
    
});

/*FZL 20/4/2018*/
App.service('getDataStatusCekSlik',function($http,apiBase,globalFunction,$stateParams,$rootScope){
    
    this.e = function(){
        $http({
            method      : "GET",
			url 		: apiBase+'prospek/get_ceksid/?id='+$stateParams.id,
            dataType    : 'json',
            headers     : { 'Content-Type':'application/json' }
        }).then(function mySuccess(R) {        
							
			if (R.data[0]){							
				if (R.data[0].REQUEST_SID_STATUS != undefined){
					$rootScope.STATUS_SLIK = R.data[0].REQUEST_SID_STATUS;                
				} else {
					$rootScope.STATUS_SLIK = 0;
				}            
				console.log('DATA STATUS FOR SLIK SEBELUM SUBMIT PROSPEK ',$rootScope.STATUS_SLIK);
			}
			
        }, function myError(R) {  
            console.log(R.statusText); 
            globalFunction.ag('danger',[R]); 
            globalFunction.closeModalLoading();  
        });
    };
    
});

App.service('getDataStatusSubmit',function($http,apiBase,globalFunction,$stateParams,$rootScope){
    
    this.e = function(){
        $http({
            method      : "GET",
            url         : apiBase+'globalclass/get_laststatus/?id='+$stateParams.id,
            dataType    : 'json',
            headers     : { 'Content-Type':'application/json' }
        }).then(function mySuccess(R) {

//            if (typeof R.data.INFORMASI_SURVEY.INFORMASI_SURVEY_INDEX.DB_STATUS !== 'undefined')
//                $rootScope.DATA_STATUS_FOR_SUBMIT = R.data.INFORMASI_SURVEY.INFORMASI_SURVEY_INDEX.DB_STATUS;
//            else
//                $rootScope.DATA_STATUS_FOR_SUBMIT = '';
            
            if (R.data[0].DB_STATUS != undefined){
                $rootScope.DATA_STATUS_FOR_SUBMIT = R.data[0].DB_STATUS;
                $rootScope.DATA_SUB_STATUS_FOR_SUBMIT = R.data[0].DB_SUB_STATUS;
                console.log('DATA STATUS FOR SUBMIT',$rootScope.DATA_STATUS_FOR_SUBMIT);
                console.log('DATA SUB STATUS FOR SUBMIT',$rootScope.DATA_SUB_STATUS_FOR_SUBMIT);
                $rootScope.STATUS_SCORING = R.data[0].SCORING_RESULT;
                $rootScope.REVIEWER_IDSDM = R.data[0].REVIEWER_IDSDM;
                $rootScope.REVIEWER_INISIAL = R.data[0].REVIEWER_INISIAL;
                $rootScope.REVIEWER_NAMA = R.data[0].REVIEWER_NAMA;
            } else {
                $rootScope.DATA_STATUS_FOR_SUBMIT = '';
                $rootScope.DATA_SUB_STATUS_FOR_SUBMIT = '';
                $rootScope.STATUS_SCORING = '';
                $rootScope.REVIEWER_IDSDM = '';
                $rootScope.REVIEWER_INISIAL = '';
                $rootScope.REVIEWER_NAMA = '';
            }
//            console.log('DATA STATUS FOR SUBMIT',R.data[0].DB_STATUS);
            

        }, function myError(R) {  
            console.log(R.statusText); 
            globalFunction.ag('danger',[R]); 
            globalFunction.closeModalLoading();  
        });
    };
    
});

App.service('modalService', ['$uibModal', function ($uibModal) {

    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: 'partials/modals/modal.html'
    };

    var modalOptions = {
        closeButtonText: 'Close',
        actionButtonText: 'OK',
        headerText: 'Proceed?',
        bodyText: 'Perform this action?'
    };

    this.showModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) customModalDefaults = {};
        customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function (customModalDefaults, customModalOptions) {
        //Create temp objects to work with since we're in a singleton service
        var tempModalDefaults = {};
        var tempModalOptions = {};

        //Map angular-ui modal custom defaults to modal defaults defined in service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

        //Map modal.html $scope custom properties to defaults defined in service
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = function ($scope, $uibModalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.modalOptions.ok = function (result) {
                    $uibModalInstance.close(result);
                };
                $scope.modalOptions.close = function (result) {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        }

        return $uibModal.open(tempModalDefaults).result;
    };

}]);

App.service('postJadwal',function ($http,globalFunction,apiBase,getKelengkapanDataById,$rootScope) {
    this.uploadFileToUrl = function(data,scope){
        var fd = new FormData();

                    if(typeof data.NO_REKENING_DIPERBAIKI !== 'undefined')
                    {fd.append('NO_REKENING_DIPERBAIKI', data.NO_REKENING_DIPERBAIKI);}
        fd.append('DB_PROSPEK_ID', data.DB_PROSPEK_ID);
        fd.append('fileToUpload', data.fileToUpload);

        console.log(fd);
        var u = apiBase + 'survey/post_jadwal';
        return $http({
            url: u,
            method: 'POST',
            data: fd,
            transformRequest: angular.identity
        }).success(function(R){
                            console.log(R.status);
            if (typeof R.status && R.status == 'Success.') {
                globalFunction.ag('success',[R]);
                scope.getlJadwalAngsuran(data.DB_PROSPEK_ID);
                getKelengkapanDataById.e({
                    scope   : scope,
                    id      : data.DB_PROSPEK_ID,
                    type    : 'survey'
                });
            } else {
                globalFunction.ag('danger',[R]);
            }
            console.log(R);
            globalFunction.closeModalLoading();
        }).error(function(R){
            console.log(R);
            globalFunction.ag('danger',[R]);
            globalFunction.closeModalLoading();
        });
        scope.fdKS.fileToUpload = '';
    };
});

App.service('postBANDING',function ($http,globalFunction,apiBase) {
        this.e = function(data,scope,callbacksuccess){
            globalFunction.openModalLoading();
            console.log(data);
            
            var fd = new FormData();
            if (typeof data.DB_PROSPEK_ID != 'undefined')
                fd.append('DB_PROSPEK_ID', data.DB_PROSPEK_ID);
            if (typeof data.BD_PLAFOND != 'undefined')
                fd.append('BD_PLAFOND', data.BD_PLAFOND);
            if (typeof data.BD_SUKU_BUNGA != 'undefined')
                fd.append('BD_SUKU_BUNGA', data.BD_SUKU_BUNGA);
            if (typeof data.BD_TENOR != 'undefined')
                fd.append('BD_TENOR', data.BD_TENOR);
            if (typeof data.BD_ADM != 'undefined')
                fd.append('BD_ADM', data.BD_ADM);
            if (typeof data.BD_FILE != 'undefined')
                fd.append('BD_FILE', data.BD_FILE);
            if (typeof data.BD_CATATAN != 'undefined')
                fd.append('BD_CATATAN', data.BD_CATATAN);
            if (typeof data.PENGIRIM != 'undefined')
                fd.append('PENGIRIM', data.PENGIRIM);
            
            if (globalFunction.fileValidation({
                filename    : data.BD_FILE.name,
                validformat : ['pdf','jpg','jpeg','png']
            }) == false) { return false };
            
            var u = apiBase + 'fde/post_banding';
            return $http({ 
                url: u, method: 'POST', data: fd, dataType: 'text', headers: { 'Content-Type': undefined}, transformRequest: angular.identity
            }).success(function(R){
                
                if (R.status == true && typeof R.status ) {
                    globalFunction.ag('success on-modal',['Data berhasil disimpan']);
                    callbacksuccess(R);
                } else {
                    globalFunction.ag('danger on-modal',['Data gagal disimpan',R['message'],R['content']]);
                }
                console.log(R);
                globalFunction.closeModalLoading();
            });
        };
    });
    
App.service('getNilaiPasarValidator',function($http,apiBase,globalFunction){
    this.e =  function(scope,sn,agunanID){
        $http({
            method      : "GET",
            url         : apiBase+'survey/get_nilai_tanah_validator/?id='+agunanID,
            dataType    : 'json',
            headers     : { 'Content-Type':'application/json' }
        }).then(function mySuccess(R) {
            
            console.log(R);
            if (typeof (R.data[0].NILAI_PASAR_TANAH_VALIDATOR) != undefined)
                scope[sn]['NILAI_PASAR_VALIDATOR_MASTER'] = R.data[0].NILAI_PASAR_TANAH_VALIDATOR;
                    
        }, function myError(R) {  
            console.log(R.statusText); 
            globalFunction.ag('danger',[R]); 
            globalFunction.closeModalLoading();  
        });
    };
});

/*======================= FILTER ==============================*/

App.filter('sumByColumn', function () {
    return function (collection, column) {
        var total = 0;		
        
        if (typeof(collection) != 'undefined') {
            collection.forEach(function (item) {
            total += parseInt(item[column]);
          });
        }
        
        return total;
    };
});

App.filter('badan_usaha', [ function() {
    return function (object,kode_usaha) {
        var array = [];
        angular.forEach(object, function (p) {
            if (p.MS_SANDI_SEKTOR_SATU == kode_usaha)
                array = p.SEKTOR_EKONOMI_LIMA_KOMBINASI_PER_SEKTOR_EKONOMI_SATU;
        });
        return array;
    };
}]);

App.filter('offset', function() {
    return function(input, start) {
        return input.slice(start);
    };
}); 

App.filter('jasperfile', function() {
    return function(input) {
        return input.substr(0,72).toLowerCase()+input.substr(72,100);
    };
}); 

// here we define our unique filter
App.filter('unique', function() {
   // we will return a function which will take in a collection
   // and a keyname
   return function(collection, keyname) {
      // we define our output and keys array;
      var output = [], 
          keys = [];
      
      // we utilize angular's foreach function
      // this takes in our original collection and an iterator function
      angular.forEach(collection, function(item) {
          // we check to see whether our object exists
          var key = item[keyname];
          // if it's not already part of our keys array
          if(keys.indexOf(key) === -1) {
              // add it to our keys array
              keys.push(key); 
              // push this item to our final output array
              output.push(item);
          }
      });
      // return our array which should be devoid of
      // any duplicates
      return output;
   };
});

/*======================== CONTROLLER =========================*/

/* Global Controller */

App.controller('menuCtrl', function($scope){
    
    $scope.menuShow = 'primary';
    console.log($scope.menuShow);
});

/* Apps Page */

App.controller('appsCtrl',function($scope,apiData,apiBase,$location){
    
    $scope.getlistAPPS = function(){
        apiData.get({
            gl      : true,
            api     : apiBase+'appslist/get_list',
            scope   : $scope,
            sn      : 'listAPPS',
            type    : 'tolist'
        });
    };
    $scope.getlistAPPS();
    
    $scope.goURL = function(x) {
        window.location.href = x;
    };
   
});

/* Home2 */

App.controller('home2Ctrl', function($scope,$http,$rootScope,globalFunction,apiBase){
    
    $scope.fdPL = {};
    $scope.listDATP = [];
    $scope.fdPL.PAGE = 1;
    $scope.fdPL.MAX_SIZE = 5;
    $scope.fdPL.LIMIT = 10;
            
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;
    
//    $scope.images = ['xMorKCmCQZKbhIcUTYyGDg','_sIakNH5SJGnsG-NVBOAJw','9rNgYJ5YSUWgOj_j3drlgw','ZEa06GztSr-lqMtSTyxqUA'];
    $scope.images = [];

    $scope.addSlide = function(i) {
        var imgBase = 'http://10.61.3.246:8080/share/proxy/alfresco-noauth/api/internal/shared/node/';
        var imgBase2 = '/content/thumbnails/imgpreview?c=force&lastModified=imgpreview%3A1535513114321';
        slides.push({
            image   : imgBase + $scope.images[i] + imgBase2,
            text    : ['Sales Activity','BTB & Deviasi','Deviasi','BTB'][slides.length % 5],
            id      : currIndex++
        });
    };
    
    for (var i = 0; i < 4; i++) {
        $scope.addSlide(i);
    }

    $scope.randomize = function() {
        var indexes = generateIndexesArray();
        assignNewIndexesToSlides(indexes);
    };
    
    // Randomize logic below

    function assignNewIndexesToSlides(indexes) {
        for (var i = 0, l = slides.length; i < l; i++) {
            slides[i].id = indexes.pop();
        }
    }

    function generateIndexesArray() {
        var indexes = [];
        for (var i = 0; i < currIndex; ++i) {
            indexes[i] = i;
        }
        return shuffle(indexes);
    }

    // http://stackoverflow.com/questions/962802#962890
    function shuffle(array) {
        var tmp, current, top = array.length;

        if (top) {
            while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
        }
        return array;
    }
        
    $scope.getDashboardTotalProspek = function(){
        $http({
            method   : "GET",
            url      : apiBase+'globalclass/get_dashboard_total_prospek',
            dataType : 'json',
            headers  : { 'Content-Type':'application/json' },
        }).then(function mySuccess(R) {

            $scope.listDATP = R.data;
            $scope.fdPL.TOTAL_ITEMS = R.data.length;

        }, function myError(R) { 
            console.log(R.statusText);
            globalFunction.ag('danger',[R]); 
        });
    };
    
    $scope.getDashboardBestAOM = function(){
        $http({
            method   : "GET",
            url      : apiBase+'globalclass/get_dashboard_best_aom',
            dataType : 'json',
            headers  : { 'Content-Type':'application/json' },
        }).then(function mySuccess(R) {

            $scope.listDBA = R.data;

        }, function myError(R) { 
            console.log(R.statusText);
            globalFunction.ag('danger',[R]); 
        });
    };
    $scope.getDashboardBestAOM();
    
});

/* Login */

App.controller('loginCtrl',function($scope,$rootScope,apiData,apiBase,$http,globalFunction,$state,$sessionStorage){
    
    $scope.fdLGN = {};
    
    $scope.login = function(){
        
         $scope.fdLGN.ALERT = 'Checking ...';
        
        $http({
            method  : 'POST',
            url     : apiBase+'auth/login/',
            headers : { 'Content-Type' : 'application/x-www-form-urlencoded' },
            data    : globalFunction.serializeObj($scope.fdLGN)
        }).then(function(R){
            
            if (typeof(R.data.STATUS) != 'undefined' && R.data.STATUS == true) {
                $rootScope.$storage = $sessionStorage.$default({
                    SESSION_LOGIN : R.data
                });
                $state.go('home_');
            } else {
                $rootScope.$storage = $sessionStorage.$default({
                    SESSION_LOGIN : []
                });
                $rootScope.$storage.SESSION_LOGIN = [];
                $scope.fdLGN.ALERT = R.data.MESSAGE;
            }
           
            console.log(R.data);
        }, function myError(R){
            console.log(R);
        });
        
    };
    
});

/* Prospek Create */

App.controller('prospekCreate',function($scope,$http,globalFunction,apiData,$location,apiBase,$rootScope,$state){
        
        $scope.calonDebiturs = [];
        $scope.formDataProspekCreate = {};
        apiData.kantorExe($scope);
        
        if ($rootScope.$storage.SESSION_LOGIN.WILAYAH)
            $scope.formDataProspekCreate.MS_WILAYAH_ID = $rootScope.$storage.SESSION_LOGIN.WILAYAH;
        if ($rootScope.$storage.SESSION_LOGIN.CABANG_KODE)
            $scope.formDataProspekCreate.MS_KODE_CABANG = $rootScope.$storage.SESSION_LOGIN.CABANG_KODE;
        if ($rootScope.$storage.SESSION_LOGIN.UNIT_KODE)
            $scope.formDataProspekCreate.MS_KODE_UNIT = $rootScope.$storage.SESSION_LOGIN.UNIT_KODE;
        
        apiData.kantorSet({
            scope   : $scope,
            fd      : 'formDataProspekCreate'
        });
        
//        $scope.dtMB = $scope.formDataProspekCreate.tanggal_masa_berlaku_identitas;

        $scope.$watchGroup([
            'formDataProspekCreate.PR_MASA_BERLAKU_IDENTITAS',
            'formDataProspekCreate.PR_TGL_LAHIR',
            'formDataProspekCreate.PR_TGL_REALISASI_KUNJUNGAN'
        ],function(){
            if ($scope.formDataProspekCreate.PR_MASA_BERLAKU_IDENTITAS)
                $scope.dtMB = new Date($scope.formDataProspekCreate.PR_MASA_BERLAKU_IDENTITAS);
            
            if ($scope.formDataProspekCreate.PR_TGL_LAHIR)
                $scope.dtTL = new Date($scope.formDataProspekCreate.PR_TGL_LAHIR);			
                        
			if ($scope.formDataProspekCreate.PR_TGL_REALISASI_KUNJUNGAN)
                $scope.dtTRP = new Date($scope.formDataProspekCreate.PR_TGL_REALISASI_KUNJUNGAN);
			// REMARK FZL 
			// else
                // $scope.dtTRP = new Date();
			
			console.log($scope.formDataProspekCreate.PR_TGL_REALISASI_KUNJUNGAN);

        });
        
        $scope.detectJP = function(v){
            for (var i=0; i<$rootScope.jns_pembiayaan.length; i++){
                if ($rootScope.jns_pembiayaan[i]['MS_PARA_GLOBAL_DETAIL_ID'] == v) {
                    var r = $rootScope.jns_pembiayaan[i]['MS_DESKRIPSI'];
                    if (r == 'TOP UP' || r == '3R')
                        $rootScope.btncreate = false;
                    else
                        $rootScope.btncreate = true;
                    
                    if (r == '3R')
                        $rootScope.btnGunakanhave3R = true; 
                    else
                        $rootScope.btnGunakanhave3R = false; 
                }
            }
            console.log($rootScope.btncreate);
        };

        $scope.processFormProspekCreate = function() {

            if ($scope.formValid()) {
                
                $scope.checkIDI();
                
                var data = $scope.formDataProspekCreate;
               
                console.log(data);
                $http({
                    method: 'POST',
                    url: apiBase + 'prospek/check_idi',
                    headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                    data: globalFunction.serializeObj(data)
                }).then(function(R){
                    
                    $rootScope.cekidiresult = R.data;
                    $rootScope.cekidiresultL = R.data.length;
                    console.log(R);

                }, function myError(R){ 
                    console.log(R.statusText); 
                    globalFunction.ag('danger',[R]); 
                    globalFunction.closeModalLoading(); 
                });

            }

        };
        
        $rootScope.submitFormDataProspekCreate = function(id){
            
            globalFunction.openModalLoading();
            $rootScope.closemcIDI();
            
            if (id)
                $scope.formDataProspekCreate.PR_INDIVIDU_ID = id;
            
            var data = $scope.formDataProspekCreate;
            console.log(data);
            $http({
                method: 'POST',
                url:  apiBase + 'prospek/post_create',
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data: globalFunction.serializeObj(data)
            }).then(function(R){

                if (R.status == '200' && typeof R.data.status && R.data.status == 'Success') {
//                    $scope.calonDebiturs.push(angular.copy($scope.formDataProspekCreate));
//                    $scope.formDataProspekCreate = {};
//                    $location.url('/calon-debitur-profile/'+R.data.last_id+'/prospek');
                    $scope.prospekCreateForm.$setPristine();
//                    $location.url('/identitas-individu/'+R.data.last_id_DB_PROSPEK_ID+'/identitas-individu-informasi-pribadi');
                    $state.go('prospek.identitasindividu.informasipribadi', { id: R.data.last_id_DB_PROSPEK_ID });
                    globalFunction.ag('success',['Data berhasil disimpan']);
                } else {
                    globalFunction.ag('danger',['Data gagal disimpan']);
                }
                console.log(R);
                globalFunction.closeModalLoading();
                
            }, function myError(R){
                globalFunction.closeModalLoading();
                console.log(R.statusText);
                globalFunction.ag('danger',[R]); 
            });
            
        };
        
        $scope.checkIDI = function(){
            
            var m = globalFunction.openModal('partials/modals/modal-idi-check.html','modal-idi-check','modalCheckIdiCtrl');
            
            $rootScope.closemcIDI = function(){
                m.close();
            };
            
            return m;
            
        };

        /* Form Valid */

        //$scope.formValidStatus = false;
        //$rootScope.agShow = false;
        
        $scope.formValid = function(){
            var e = globalFunction.formValidation({
                scope : $scope,
                form  : 'formDataProspekCreate',
                field : [
                    { fn : 'PR_NAMA_PANGGILAN',  fk : 'Nama panggilan' },
                    { fn : 'MS_JENIS_IDENTITAS_ID',  fk : 'Jenis identitas' },
                    { fn : 'PR_NO_IDENTITAS',  fk : 'Nomor identitas' },
                    { fn : 'PR_TEMPAT_LAHIR',  fk : 'Tempat lahir' },
                    { fn : 'PR_TGL_LAHIR',  fk : 'Tanggal lahir' },
                    { fn : 'MS_JENIS_ALAMAT_ID',  fk : 'Jenis alamat' },
                    { fn : 'PR_ALAMAT',  fk : 'Alamat' },
                    { fn : 'PR_KONTAK',  fk : 'Kontak' },
                    { fn : 'MS_JENIS_USAHA_ID',  fk : 'Jenis usaha' },
                    { fn : 'MS_STATUS_KAWIN_ID',  fk : 'Status Kawin' }
                ],
                callback : function(){
                    if (!$scope.formDataProspekCreate.masa_berlaku_identitas_seumur_hidup && !$scope.formDataProspekCreate.PR_MASA_BERLAKU_IDENTITAS) {
                        $scope.formValidMsg.push('Masa berlaku identitas harus diisi');
                    }
                    
                    var nD = globalFunction.calculateAge($scope.formDataProspekCreate.PR_TGL_LAHIR);
                    
//                    if (nD < 21 || isNaN(nD))
//                       $scope.formValidMsg.push('Usia minimal 21 tahun');
                   
                    if (isNaN(nD)){
                        $scope.formValidMsg.push('Usia minimal 21 tahun atau 17 tahun tapi sudah menikah');
                    } else if ((nD < 17 && (
                        $scope.formDataProspekCreate.MS_STATUS_KAWIN_ID == 18 || 
                        $scope.formDataProspekCreate.MS_STATUS_KAWIN_ID == 19 ||
                        $scope.formDataProspekCreate.MS_STATUS_KAWIN_ID == 20 ||
                        $scope.formDataProspekCreate.MS_STATUS_KAWIN_ID == 21
                        )
                        && $scope.formDataProspekCreate.MS_STATUS_KAWIN_ID
                    )){
                        $scope.formValidMsg.push('Usia minimal 21 tahun atau 17 tahun tapi sudah menikah atau cerai');
                    } else if ((nD < 21 && $scope.formDataProspekCreate.MS_STATUS_KAWIN_ID == 17) && $scope.formDataProspekCreate.MS_STATUS_KAWIN_ID) {
                        $scope.formValidMsg.push('Usia minimal 21 tahun atau 17 tahun tapi sudah menikah atau cerai');
                    }
                           
                }
            });
            
            console.log(e);
            return e;
        };
            

        /* Get Data Calon Debitur */

        /* Calon Debitur List */

//        apiData.get($rootScope,'calonDebitur',apiBase+'prospek/get_calonDebitur');

        /* Paging Calon Cebitur */

        $scope.maxSize = 4;
        $scope.totalItems = 64;
        $scope.currentPage = 1;

        $scope.setPage = function (pageNo) {
          $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function(cp) {
            console.log(cp);
        };
        
        $scope.filterJenisPembiayaan = function (x) {
            return false || x.MS_PARA_GLOBAL_DETAIL_ID !== 601 ||  x.MS_PARA_GLOBAL_DETAIL_ID !== 1511 ||  x.MS_PARA_GLOBAL_DETAIL_ID !== 1512;
        };

    })
    
    .controller('modalCheckIdiCtrl',function($scope,globalFunction,$rootScope,apiBase,$http){
        
        $scope.IDIDetail = function(id){
            
            var m = globalFunction.openModal('partials/modals/modal-idi-detail.html','modal-idi-detail modal-form','modalIDIDetailCtrl');
            
            $rootScope.closemid = function(){
                m.close();
            };
            
            $scope.getindividu(id);
            
            return m;
            
        };
        
        $scope.getindividu = function(id){
            
            var api = apiBase + 'prospek/get_detail_pr_individu/?id='+id;
			
			console.log('ada gak y '+api);
            
            $http({
                method : "GET",
                url : api,
                dataType: 'json',
                headers: { 'Content-Type':'application/json' },
            }).then(function mySuccess(R) {
                
                $rootScope.indvDtl = R.data[0];
                
                console.log(R);
                
            }, function myError(R) { 
                console.log(R.statusText);
                globalFunction.closeModalLoading();
                globalFunction.ag('danger',[R]); 
            });
            
        };
        
        
         
    })
    
    .controller('modalIDIDetailCtrl',function(){
        
        
    })
;
    
/* Calon Debitur Profile */    
    
App.controller('calonDebiturProfileCtrl',function($scope, $rootScope, $stateParams,apiData,apiBase,$http,getKelengkapanData){
    
    apiData.get_allDataCalonDebiturPerId($scope,$stateParams.id);
    
    $scope.$watch('PR_INDIVIDU_ID',function(newValue,oldValue) {
        if(newValue) {
            getKelengkapanData.e({
                type            : 'prospek',
                scope           : $scope,
                PR_INDIVIDU_ID  : $scope.PR_INDIVIDU_ID    
            });
            getKelengkapanData.e({
                type            : 'survey',
                scope           : $scope,
                PR_INDIVIDU_ID  : $scope.PR_INDIVIDU_ID    
            });
        }
    });
    
});

App.controller('calonDebiturProfile_Ctrl',function($scope, $rootScope, $stateParams,apiData){
    
    apiData.get_allDataCalonDebiturPerId($scope,$stateParams.id);
    
});

/*  ========================================================
 *  ######################### PROSPEK #######################
 *  ======================================================== */

App.controller('prospekCtrl',function($scope,$stateParams,apiData,$rootScope,getKelengkapanDataById){
    
    apiData.get_allDataCalonDebiturPerId($scope,$stateParams.id);
    
    getKelengkapanDataById.e({
        scope   : $rootScope,
        id      : $stateParams.id,
        type    : 'prospek'
    });
    
    $scope.PROSPEK_SUBMIT_PERSENTASE = 99;
    
    $scope.$watchGroup(['KELENGKAPAN_DATA','PROSPEK_SUBMIT_PERSENTASE','DATA_STATUS_FOR_SUBMIT','DATA_SUB_STATUS_FOR_SUBMIT'],function(){
        
        if (
            typeof($scope.KELENGKAPAN_DATA) != 'undefined' &&
            typeof($scope.PROSPEK_SUBMIT_PERSENTASE) != 'undefined' &&
            typeof($rootScope.DATA_STATUS_FOR_SUBMIT) != 'undefined'
        ) {
            if ($scope.KELENGKAPAN_DATA.PERCENTASE_FILL_DATA_PROSPEK > $scope.PROSPEK_SUBMIT_PERSENTASE && $rootScope.DATA_STATUS_FOR_SUBMIT < 1 && $rootScope.DATA_SUB_STATUS_FOR_SUBMIT == 2 ) {
                $scope.PROSPEK_SUBMITED = 5; //kku approved / rejected
            } else if ($scope.KELENGKAPAN_DATA.PERCENTASE_FILL_DATA_PROSPEK > $scope.PROSPEK_SUBMIT_PERSENTASE && $rootScope.DATA_STATUS_FOR_SUBMIT < 1 && $rootScope.DATA_SUB_STATUS_FOR_SUBMIT == 1 ) {
                $scope.PROSPEK_SUBMITED = 4; //aom submited
				$scope.PROSPEK_LOCK = 'YES';
            } else if ($scope.KELENGKAPAN_DATA.PERCENTASE_FILL_DATA_PROSPEK > $scope.PROSPEK_SUBMIT_PERSENTASE && $rootScope.DATA_STATUS_FOR_SUBMIT < 1 && $rootScope.DATA_SUB_STATUS_FOR_SUBMIT == 0){
                $scope.PROSPEK_SUBMITED = 1; //show global submit button
            } else if ($rootScope.DATA_STATUS_FOR_SUBMIT >= 1){
                $scope.PROSPEK_SUBMITED = 2; //show status submited
				$scope.PROSPEK_LOCK = 'YES';
            } else {
                $scope.PROSPEK_SUBMITED = 3; //show percentage
            }
            
            console.log('PROSPEK_SUBMITED => '+$scope.PROSPEK_SUBMITED);
        }
        
    });
    
});

/* Prospek Identitas Individu */

App.controller('identitasIndividuCtrl', function($scope, apiData, $rootScope, apiBase, $http, globalFunction, $stateParams, getKelengkapanDataById) {
        
        apiData.get_allDataCalonDebiturPerId($scope,$stateParams.id);
        
//        getKelengkapanDataById.e({
//            scope   : $scope,
//            id      : $stateParams.id
//        });
        
        $scope.formDataIdentitasIndividu = {};
    
        $scope.get_identitas = function(id){
            
            globalFunction.openModalLoading();
            
            $http({
                method : "GET",
                url : apiBase + 'prospek/get_detailCalonDebitur/?id='+id,
                dataType: 'json',
                headers: { 'Content-Type':'application/json' },
            }).then(function mySuccess(R) {
                
                $scope.formDataIdentitasIndividu = (typeof R.data.individu !== 'undefined') ? R.data.individu[0] : [];
                
                if ($scope.formDataIdentitasIndividu.PR_MASA_BERLAKU_IDENTITAS == '9999-12-31')
                    $scope.formDataIdentitasIndividu.masa_berlaku_identitas_seumur_hidup = 1;
                
                if (typeof $scope.formDataIdentitasIndividu.MS_KEWARGANEGARAAN_ID === 'undefined' || $scope.formDataIdentitasIndividu.MS_KEWARGANEGARAAN_ID == '' || $scope.formDataIdentitasIndividu.MS_KEWARGANEGARAAN_ID == null)
                    $scope.formDataIdentitasIndividu.MS_KEWARGANEGARAAN_ID = 22;
                
                $scope.dtTL = new Date($scope.formDataIdentitasIndividu.PR_TGL_LAHIR);
                $scope.dtMB = new Date($scope.formDataIdentitasIndividu.PR_MASA_BERLAKU_IDENTITAS); /* FZL 9/4/2018 */
                
                $scope.formDataIdentitasIndividu.MS_KODE_BIDANG_USAHA_SELECT = {
                    MS_SANDI_SEKTOR_LIMA: $scope.formDataIdentitasIndividu.MS_KODE_BIDANG_USAHA
                };
                
                for (var i=0; i<$rootScope.lov_bidang_usaha_sid_mis.length; i++){
                    if ($rootScope.lov_bidang_usaha_sid_mis[i].MS_SANDI_SEKTOR_LIMA == $scope.formDataIdentitasIndividu.MS_KODE_BIDANG_USAHA){
                        $scope.formDataIdentitasIndividu.MS_KODE_BIDANG_USAHA_SELECT.MS_NAMA_SEKTOR_LIMA = $rootScope.lov_bidang_usaha_sid_mis[i].MS_NAMA_SEKTOR_LIMA;
                        console.log('WORKING ... ',$rootScope.lov_bidang_usaha_sid_mis[i].MS_NAMA_SEKTOR_LIMA);
                    }
                }
                    
                globalFunction.closeModalLoading();
                
            }, function myError(R) { 
                console.log(R.statusText);
                globalFunction.closeModalLoading();
                globalFunction.ag('danger',[R]); 
            });

        };
        $scope.get_identitas($stateParams.id);
        
        $scope.processFormIdentitasIndividu = function() {
					
            
            $scope.formDataIdentitasIndividu.DB_PROSPEK_ID = $stateParams.id;
            
            var data = $scope.formDataIdentitasIndividu;
            
            console.log(data);					
			
			
			if ($scope.formValid()) {			
            		           
					globalFunction.openModalLoading();					

					$http({
						method: 'POST',
						url: apiBase + 'prospek/post_indentitasIndividu',
						headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
						data: globalFunction.serializeObj(data)
					}).then(function(R){

						if (R.status == '200' && typeof R.data.status && R.data.status == 'Success') {
							globalFunction.ag('success',['Data berhasil disimpan']);
							
							getKelengkapanDataById.e({
								scope   : $rootScope,
								id      : $stateParams.id,
								type    : 'prospek'
							});
						} else {
							globalFunction.ag('danger',['Data gagal disimpan']);
						}
						console.log(R);
						globalFunction.closeModalLoading();
						
					}, function myError(R){ 
						console.log(R.statusText); 
						globalFunction.ag('danger',[R]); 
						globalFunction.closeModalLoading();
					});
            }
            
        };				
        
        $scope.formValid = function(){
            
            $scope.formValidMsg = [];
            /*
            if (!$scope.formDataIdentitasIndividu.ktp.alamat_detail) {
                $scope.formValidMsg.push('Alamat detail KTP tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.ktp.kabupaten_kota) {
                $scope.formValidMsg.push('Kabupaten kota KTP tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.ktp.kecamatan) {
                $scope.formValidMsg.push('Kecamatan KTP tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.ktp.kodepos) {
                $scope.formValidMsg.push('Kode Pos KTP tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.ktp.lama_menempati) {
                $scope.formValidMsg.push('Lama menempati KTP tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.ktp.provinsi) {
                $scope.formValidMsg.push('Provinsi KTP tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.ktp.rt_rw) {
                $scope.formValidMsg.push('RT RW  KTP tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.ktp.status_tempat) {
                $scope.formValidMsg.push('Status tempat KTP tidak boleh kosong');
            }
            
            
            if (!$scope.formDataIdentitasIndividu.domisili.alamat_detail) {
                $scope.formValidMsg.push('Alamat detail Domisili tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.domisili.kabupaten_kota) {
                $scope.formValidMsg.push('Kabupaten kota Domisili tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.domisili.kecamatan) {
                $scope.formValidMsg.push('Kecamatan Domisili tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.domisili.kodepos) {
                $scope.formValidMsg.push('Kode Pos Domisili tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.domisili.lama_menempati) {
                $scope.formValidMsg.push('Lama menempati Domisili tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.domisili.provinsi) {
                $scope.formValidMsg.push('Provinsi Domisili tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.domisili.rt_rw) {
                $scope.formValidMsg.push('RT RW  Domisili tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.domisili.status_tempat) {
                $scope.formValidMsg.push('Status tempat Domisili tidak boleh kosong');
            }
            
            
            if (!$scope.formDataIdentitasIndividu.tempat_usaha.alamat_detail) {
                $scope.formValidMsg.push('Alamat detail Tempat Usaha tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.tempat_usaha.kabupaten_kota) {
                $scope.formValidMsg.push('Kabupaten kota Tempat Usaha tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.tempat_usaha.kecamatan) {
                $scope.formValidMsg.push('Kecamatan Tempat Usaha tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.tempat_usaha.kodepos) {
                $scope.formValidMsg.push('Kode Pos Tempat Usaha tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.tempat_usaha.lama_menempati) {
                $scope.formValidMsg.push('Lama menempati Tempat Usaha tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.tempat_usaha.provinsi) {
                $scope.formValidMsg.push('Provinsi Tempat Usaha tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.tempat_usaha.rt_rw) {
                $scope.formValidMsg.push('RT RW  Tempat Usaha tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.tempat_usaha.status_tempat) {
                $scope.formValidMsg.push('Status tempat Tempat Usaha tidak boleh kosong');
            }
            */
           
            if ($rootScope.thisState == 'prospek.identitasindividu.informasipribadi')
            {
               if (!$scope.formDataIdentitasIndividu.PR_NAMA_IBU_KANDUNG) {
                    $scope.formValidMsg.push('Nama ibu kandung tidak boleh kosong');
                } 
                if (!$scope.formDataIdentitasIndividu.PR_NAMA_PANGGILAN) {
                    $scope.formValidMsg.push('Nama panggilan tidak boleh kosong');
                }
                if (!$scope.formDataIdentitasIndividu.PR_TEMPAT_LAHIR) {
                    $scope.formValidMsg.push('Tempat lahir tidak boleh kosong');
                }
                if (!$scope.formDataIdentitasIndividu.PR_NAMA_LENGKAP) {
                    $scope.formValidMsg.push('Nama lengkap tidak boleh kosong');
                }
                if (!$scope.formDataIdentitasIndividu.MS_JENIS_KELAMIN_ID) {
                    $scope.formValidMsg.push('Jenis Kelamin tidak boleh kosong');
                }
                if (!$scope.formDataIdentitasIndividu.PR_TEMPAT_LAHIR) {
                    $scope.formValidMsg.push('Tempat Lahir tidak boleh kosong');
                }
				
				if (!$scope.formDataIdentitasIndividu.MS_AGAMA_ID) {
                    $scope.formValidMsg.push('Agama tidak boleh kosong');
                }
				
                if (!$scope.formDataIdentitasIndividu.MS_JENIS_IDENTITAS_ID) {
                    $scope.formValidMsg.push('Jenis Identitas tidak boleh kosong');
                }
                if (!$scope.formDataIdentitasIndividu.PR_NO_IDENTITAS) {
                    $scope.formValidMsg.push('No Identitas tidak boleh kosong');
                }
                if (!$scope.formDataIdentitasIndividu.MS_STATUS_KAWIN_ID) {
                    $scope.formValidMsg.push('Status Perkawinan tidak boleh kosong');
                }
                if (!$scope.formDataIdentitasIndividu.MS_KEWARGANEGARAAN_ID) {
                    $scope.formValidMsg.push('Kewarganegaraan tidak boleh kosong');
                }
                if (!$scope.formDataIdentitasIndividu.MS_JENIS_USAHA_ID) {
                    $scope.formValidMsg.push('Jenis Usaha tidak boleh kosong');
                }
                var nD = globalFunction.calculateAge($scope.formDataIdentitasIndividu.PR_TGL_LAHIR);
                if (isNaN(nD)){
                    $scope.formValidMsg.push('Usia minimal 21 tahun atau 17 tahun tapi sudah menikah');
                } else if ((nD < 17 && (
                    $scope.formDataIdentitasIndividu.MS_STATUS_KAWIN_ID == 18 || 
                    $scope.formDataIdentitasIndividu.MS_STATUS_KAWIN_ID == 19 ||
                    $scope.formDataIdentitasIndividu.MS_STATUS_KAWIN_ID == 20 ||
                    $scope.formDataIdentitasIndividu.MS_STATUS_KAWIN_ID == 21
                    )
                    && $scope.formDataIdentitasIndividu.MS_STATUS_KAWIN_ID
                )){
                    $scope.formValidMsg.push('Usia minimal 21 tahun atau 17 tahun tapi sudah menikah');
                } else if ((nD < 21 && $scope.formDataIdentitasIndividu.MS_STATUS_KAWIN_ID == 17) && $scope.formDataIdentitasIndividu.MS_STATUS_KAWIN_ID) {
                    $scope.formValidMsg.push('Usia minimal 21 tahun atau 17 tahun tapi sudah menikah');
                }
            }
            
			console.log('state '+$rootScope.thisState);
			
            if ($rootScope.thisState == 'prospek.identitasindividu.statuspekerjaan')
            {
                if (!$scope.formDataIdentitasIndividu.MS_PEKERJAAN_ID) {
                    $scope.formValidMsg.push('Pekerjaan tidak boleh kosong');
                }
                if (!$scope.formDataIdentitasIndividu.PR_NPWP) {
                    $scope.formValidMsg.push('NPWP tidak boleh kosong');
                }
            }
            
            if ($rootScope.thisState == 'prospek.identitasindividu.pendidikan')
            {
                if (!$scope.formDataIdentitasIndividu.MS_PENDIDIKAN_ID) {
                    $scope.formValidMsg.push('Pendidikan Terakhir tidak boleh kosong');
                }
            }
            
            if ($rootScope.thisState == 'prospek.identitasindividu.referensi')
            {
                if (!$scope.formDataIdentitasIndividu.MS_JENIS_REFERENSI_ID) {
                    $scope.formValidMsg.push('Jenis Referensi tidak boleh kosong');
                }
            }
            
            if ($rootScope.thisState == 'prospek.identitasindividu.lainnya')
            {
                if (!$scope.formDataIdentitasIndividu.MS_KODE_BIDANG_USAHA) {
                    $scope.formValidMsg.push('Kode Bidang Usaha tidak boleh kosong');
                }

                if (!$scope.formDataIdentitasIndividu.MS_KODE_GOLONGAN_DEBITUR_SID_ID) {
                    $scope.formValidMsg.push('Kode Golongan Debitur (SID) tidak boleh kosong');
                }

                if (!$scope.formDataIdentitasIndividu.MS_HUB_DEB_PNM_ID) {
                    $scope.formValidMsg.push('Hub Debitur Dengan Bank (SID) tidak boleh kosong');
                }

                if (!$scope.formDataIdentitasIndividu.MS_HUB_DEB_BANK_ID) {
                    $scope.formValidMsg.push('Hub Debitur Dengan Bank tidak boleh kosong');
                }
            }
                      
            
            //if (!$scope.formDataIdentitasIndividu.nomor_hp) {
            //    $scope.formValidMsg.push('No HP tidak boleh kosong');
            //}
            /*if (!$scope.formDataIdentitasIndividu.nomor_telepon) {
                $scope.formValidMsg.push('Nomor telepon tidak boleh kosong');
            }*/
            /*if (!$scope.formDataIdentitasIndividu.pekerjaan) {
                $scope.formValidMsg.push('Pekerjaan tidak boleh kosong');
            }*/
            /*if (!$scope.formDataIdentitasIndividu.pendidikan_terakhir) {
                $scope.formValidMsg.push('Pendidikan terakhir tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.status_pekerjaan) {
                $scope.formValidMsg.push('Status pekerjaan tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.statusperkawinan) {
                $scope.formValidMsg.push('Status perkawinan tidak boleh kosong');
            }*/
//            if (!$scope.formDataIdentitasIndividu.PR_TGL_LAHIR) {
//                $scope.formValidMsg.push('Tanggal lahir tidak boleh kosong');
//            }
            
            /*if (!$scope.formDataIdentitasIndividu.agama) {
                $scope.formValidMsg.push('Agama tidak boleh kosong');
            }
            if (!$scope.formDataIdentitasIndividu.gelar) {
                $scope.formValidMsg.push('Gelar tidak boleh kosong');
            }*/
			
            
//            if (!$scope.formDataIdentitasIndividu.MS_KODE_USAHA_SID) {
//                $scope.formValidMsg.push('Kode Usaha (SID) tidak boleh kosong');
//            }
                        
            
               
            if ($scope.formValidMsg.length > 0) {
                //$scope.formValidStatus = true;
                globalFunction.ag('danger',$scope.formValidMsg);
                return false;
            } else {
                return true;
            }
            
        };
        
        /* Alamat */
        
        apiData.alamatExe($scope);
        
    })
    
    .controller('identitasIndividuAlamatCtrl',function(modalService,getKelengkapanDataById,$scope,globalFunction,$http,apiBase,$stateParams,apiData,$rootScope){
        
        $scope.formDataIdentitasIndividuAlamat = [];
        
        $scope.proccessFormIdentitasIndividuAlamat = function(){
            if ($scope.formValid()) {
                $scope.formDataIdentitasIndividuAlamat.DB_PROSPEK_ID = $stateParams.id;
                var data = $scope.formDataIdentitasIndividuAlamat;
                console.log(data);
                globalFunction.openModalLoading();
                $http({
                    method: 'POST',
                    url: apiBase + 'prospek/post_alamat',
                    headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                    data: globalFunction.serializeObj(data)
                }).then(function(R){
                    if (R.status == '200' && typeof R.data.status && R.data.status == 'Success') {
                        globalFunction.ag('success',['Data berhasil disimpan']);
                        $scope.formDataIdentitasIndividuAlamat = [];
                        $scope.getAlamat($stateParams.id);
                        getKelengkapanDataById.e({
                            scope   : $rootScope,
                            id      : $stateParams.id,
                            type    : 'prospek'
                        });
                    } else {
                        globalFunction.ag('danger',['Data gagal disimpan']);
                    }
                    console.log(R);
                    globalFunction.closeModalLoading();

                }, function myError(R){ 
                    console.log(R.statusText); 
                    globalFunction.ag('danger',[R]); 
                    globalFunction.closeModalLoading(); 
                });
            }
        };
        
        $scope.getAlamat = function(id){
            $http({
                method : "GET",
                url : apiBase + 'prospek/get_alamatlist/?id='+id,
                dataType: 'json',
                headers: { 'Content-Type':'application/json' },
            }).then(function mySuccess(R) {
                 
                 $scope.alamatList = (typeof R.data !== 'undefined') ? R.data : [];
            
            }, function myError(R) { 
                console.log(R.statusText); 
                globalFunction.ag('danger',[R]); 
                globalFunction.closeModalLoading();  
            });
        };
        $scope.getAlamat($stateParams.id);
        
        $scope.editAlamat = function(id){
            $http({
                method : "GET",
                url : apiBase + 'prospek/get_alamatid/?id='+id,
                dataType: 'json',
                headers: { 'Content-Type':'application/json' },
            }).then(function mySuccess(R) {		
				$scope.formDataIdentitasIndividuAlamat = (typeof R.data !== 'undefined') ? R.data[0] : [];
				apiData.alamatSet({
					scope   : $scope,
					fd      : 'formDataIdentitasIndividuAlamat'
				});
				$scope.jenis_alamat_disable = (R.data[0].MS_JENIS_ALAMAT_ID==113) ? 'YES' : 'NO';				
				if (typeof R.data !== 'undefined') {
					$scope.formDataIdentitasIndividuAlamat.PR_LAMA_MENEMPATI_TAHUN = Math.floor(parseInt(R.data[0].PR_LAMA_MENEMPATI) / 12);
					$scope.formDataIdentitasIndividuAlamat.PR_LAMA_MENEMPATI_BULAN = parseInt(R.data[0].PR_LAMA_MENEMPATI) % 12; 
				}
				console.log($scope.formDataIdentitasIndividuAlamat);

            }, function myError(R) { 
                console.log(R.statusText);
                globalFunction.ag('danger',[R]); 
                globalFunction.closeModalLoading(); 
            });
        };			
        		
		$scope.reload = function(){location.reload();}
		
        $scope.deleteAlamat = function(data){

            modalService.showModal({}, {
                closeButtonText: 'Batal',
                actionButtonText: 'Hapus',
                headerText: 'Hapus Alamat',
                bodyText: 'Apakah anda yakin menghapus alamat ini ?'
            }).then(function (result) {
                
                globalFunction.openModalLoading();
                $http({
                    method: 'POST',
                    url: apiBase + 'prospek/delete_alamat',
                    headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                    data: globalFunction.serializeObj(data)
                }).then(function(R){
                    if (R.status == '200' && typeof R.data.status && R.data.status == 'Success') {
                        globalFunction.ag('success',['Data berhasi dihapus']);
                        $scope.getAlamat($stateParams.id);
                        getKelengkapanDataById.e({
                            scope   : $rootScope,
                            id      : $stateParams.id,
                            type    : 'prospek'
                        });
                    } else {
                        globalFunction.ag('danger',['Data gagal dihapus']);
                    }
                    console.log(R);
                    globalFunction.closeModalLoading();
                }, function myError(R){ 
                    console.log(R.statusText); 
                    globalFunction.ag('danger',[R]); 
                    globalFunction.closeModalLoading();  
                });
                
            });
        };
        
        $scope.viewAlamat = function(id){
            apiData.get_view({
                gl      : true,
                api     : apiBase + 'prospek/get_alamatid/?id='+id,
                scope   : $scope,
                fd      : 'formDataIdentitasIndividuAlamat',
                title   : 'View Identitas - Alamat'
            });
            $scope.$watch('formDataIdentitasIndividuAlamat',function(){
                $rootScope.ROW_VIEW = [
//                    { k : 'Id', v : $scope.formDataIdentitasIndividuAlamat.PR_INDIVIDU_ALAMAT_ID },
                    { k : 'Jenis Alamat', v : $scope.formDataIdentitasIndividuAlamat.MS_JENIS_ALAMAT },
                    { k : 'RT', v : $scope.formDataIdentitasIndividuAlamat.PR_RT },
                    { k : 'RW', v : $scope.formDataIdentitasIndividuAlamat.PR_RW },
                    { k : 'Provinsi', v : $scope.formDataIdentitasIndividuAlamat.MS_PROVINSI },
                    { k : 'Kabupaten / Kota', v : $scope.formDataIdentitasIndividuAlamat.MS_KABKOT },
                    { k : 'Kecamatan', v : $scope.formDataIdentitasIndividuAlamat.MS_KECAMATAN },
                    { k : 'Keluarahan', v : $scope.formDataIdentitasIndividuAlamat.MS_KELDES },
                    { k : 'Kode Pos', v : $scope.formDataIdentitasIndividuAlamat.MS_KODE_POS_ID },
                    { k : 'Lama Menempati', v : $scope.formDataIdentitasIndividuAlamat.PR_LAMA_MENEMPATI },
                    { k : 'Status Tempat', v : $scope.formDataIdentitasIndividuAlamat.MS_STATUS_TEMPAT },
                    { k : 'Jarak ke unit', v : $scope.formDataIdentitasIndividuAlamat.PR_JARAK_ALAMAT }
                ];
            });
        };
        
        $scope.formValid = function(){
            var e = globalFunction.formValidation({
                scope : $scope,
                form  : 'formDataIdentitasIndividuAlamat',
                field : [
                    { fn : 'MS_JENIS_ALAMAT_ID',  fk : 'Jenis alamat' },
                    { fn : 'PR_ALAMAT',  fk : 'Alamat' },
                    { fn : 'PR_RT',  fk : 'RT' },
                    //{ fn : 'PR_RW',  fk : 'RW' }, FZL remark 6/4/2018
                    { fn : 'MS_PROVINSI_ID',  fk : 'Provinsi' },
                    { fn : 'MS_KABKOT_ID',  fk : 'Kabupaten / kota' },
                    { fn : 'MS_KECAMATAN_ID',  fk : 'Kecamatan' },
                    { fn : 'MS_KELDES_ID',  fk : 'Keluarahan / desa' },
                    { fn : 'MS_KODE_POS_ID',  fk : 'Kode pos' },
                    { fn : 'PR_LAMA_MENEMPATI',  fk : 'Lama menempati' },
                    { fn : 'MS_STATUS_TEMPAT_ID',  fk : 'Status tempat' },
                    { fn : 'PR_LAMA_MENEMPATI_TAHUN',  fk : 'Lama menempati tahun' },
                    { fn : 'PR_LAMA_MENEMPATI_BULAN',  fk : 'Lama menempati bulan' },
                    { fn : 'PR_JARAK_ALAMAT',  fk : 'Jarak ke unit' }
                ]
            });
            return e;
        };
        
        $scope.setAlamatUtama = function(id){
            $scope.formDataIdentitasIndividuAlamat.DB_PROSPEK_ID = $stateParams.id;
            $scope.formDataIdentitasIndividuAlamat.PR_INDIVIDU_ALAMAT_ID = id;
            apiData.post({
                gl      : true,
                api     : apiBase+'prospek/post_alamatutama',
                data    : $scope.formDataIdentitasIndividuAlamat,
                scope   : $scope,
                reload  : 'getAlamat'
            });
        };
        
        $scope.$watchGroup(['formDataIdentitasIndividuAlamat.PR_LAMA_MENEMPATI_TAHUN','formDataIdentitasIndividuAlamat.PR_LAMA_MENEMPATI_BULAN'],function(nV){
            if (nV){
                $scope.formDataIdentitasIndividuAlamat.PR_LAMA_MENEMPATI = parseInt( $scope.formDataIdentitasIndividuAlamat.PR_LAMA_MENEMPATI_TAHUN * 12 ) + parseInt($scope.formDataIdentitasIndividuAlamat.PR_LAMA_MENEMPATI_BULAN);
            }
        });
		
		$scope.resetAlamat = function(){
			$scope.formDataIdentitasIndividuAlamat=[];
			$scope.formDataIdentitasIndividuAlamat.PR_LAMA_MENEMPATI_TAHUN = 0; 
			$scope.formDataIdentitasIndividuAlamat.PR_LAMA_MENEMPATI_BULAN = 0;
			$scope.jenis_alamat_disable = 'NO';
		};
        
    })
    
    .controller('identitasIndividuAlamatKtpCtrl',function($scope,globalFunction,$http,apiBase,$stateParams,apiData,$rootScope){

        $scope.adrstype = 'ktp';
        
        $scope.get_allDataCalonDebiturPerId = function(id){
           
            $http({
                method : "GET",
                url : apiBase + 'prospek/get_detailCalonDebitur/?id='+id,
                dataType: 'json',
                headers: { 'Content-Type':'application/json' },
            }).then(function mySuccess(R) {
                if (R.data.alamat[0].jenis_alamat == 45)
                    $scope.formDataIdentitasIndividu['ktp'] = R.data.alamat[0];
            }, function myError(R) { 
                console.log(R.statusText); 
                globalFunction.ag('danger',[R]); 
            });

        };
        
        $scope.get_allDataCalonDebiturPerId($stateParams.id);
        
    })
    
    .controller('identitasIndividuAlamatDomisiliCtrl',function($scope,globalFunction,$http,apiBase,$stateParams,apiData){
        
        $scope.adrstype = 'domisili';
        
        $scope.get_allDataCalonDebiturPerId = function(id){
            $http({
                method : "GET",
                url : apiBase + 'prospek/get_detailCalonDebitur/?id='+id,
                dataType: 'json',
                headers: { 'Content-Type':'application/json' },
            }).then(function mySuccess(R) {
                if (R.data.alamat[0].jenis_alamat == 46)
                    $scope.formDataIdentitasIndividu['domisili'] = R.data.alamat[0];
            }, function myError(R) { 
                console.log(R.statusText); 
                globalFunction.ag('danger',[R]); 
            });

        };
        
        $scope.get_allDataCalonDebiturPerId($stateParams.id);
        
    })
    
    .controller('identitasIndividuAlamatTempatUsahaCtrl',function($scope){
        $scope.adrstype = 'tempatusaha';
    })
    
    .controller('identitasIndividuKontakCtrl',function(modalService,getKelengkapanDataById,$scope,apiBase,globalFunction,$http,$stateParams,apiData,$rootScope){
        
        $scope.formDataIdentitasIndividuKontak = {};
        
        $scope.getKontak = function(id){
            $http({
                method : "GET",
                url : apiBase + 'prospek/get_kontaklist/?id='+id,
                dataType: 'json',
                headers: { 'Content-Type':'application/json' },
            }).then(function mySuccess(R) {
                $scope.kontakList = (typeof R.data !== 'undefined') ? R.data : [];
            }, function myError(R) { 
                console.log(R.statusText);
                globalFunction.ag('danger',[R]); 
            });
        };
        $scope.getKontak($stateParams.id);
        
        $scope.postKontak = function(){
            if ($scope.formValid()){
                $scope.formDataIdentitasIndividuKontak.DB_PROSPEK_ID = $stateParams.id;
                var data = $scope.formDataIdentitasIndividuKontak;
                console.log(data);
                globalFunction.openModalLoading();
                $http({
                    method: 'POST',
                    url: apiBase + 'prospek/post_kontak',
                    headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                    data: globalFunction.serializeObj(data)
                }).then(function(R){
                    if (R.status == '200' && typeof R.data.status && R.data.status == 'Success') { 
                        globalFunction.ag('success',['Data berhasil disimpan']);
                        $scope.getKontak($stateParams.id);
                        $scope.formDataIdentitasIndividuKontak = {};
                        getKelengkapanDataById.e({
                            scope   : $rootScope,
                            id      : $stateParams.id,
                            type    : 'prospek'
                        });
                    } else {
                        globalFunction.ag('danger',['Data gagal disimpan']);
                    }
                    console.log(R.data.status);
                    console.log(R);
                    globalFunction.closeModalLoading();
                }, function myError(R){ 
                    console.log(R.statusText); 
                    globalFunction.ag('danger',[R]); 
                    globalFunction.closeModalLoading(); 
                });
            }
        };
        
        $scope.editKontak = function(id){
            $http({
                method : "GET",
                url : apiBase + 'prospek/get_kontakid/?id='+id,
                dataType: 'json',
                headers: { 'Content-Type':'application/json' },
            }).then(function mySuccess(R) {
                $scope.formDataIdentitasIndividuKontak = (typeof R.data !== 'undefined') ? R.data[0] : [];
            }, function myError(R) { 
                console.log(R.statusText);
                globalFunction.ag('danger',[R]);  
            });
        };
        
        $scope.deleteKontak = function(data){
            modalService.showModal({}, {
                closeButtonText: 'Batal',
                actionButtonText: 'Hapus',
                headerText: 'Hapus Kontak',
                bodyText: 'Apakah anda yakin menghapus kontak ini ?'
            }).then(function (result) {
                globalFunction.openModalLoading();
                $http({
                    method: 'POST',
                    url: apiBase + 'prospek/delete_kontak',
                    headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                    data: globalFunction.serializeObj(data)
                }).then(function(R){
                    if (R.status == '200' && typeof R.data.status && R.data.status == 'Success') {
                        globalFunction.ag('success',['Data berhasil dihapus']);
                        $scope.getKontak($stateParams.id);
                        getKelengkapanDataById.e({
                            scope   : $rootScope,
                            id      : $stateParams.id,
                            type    : 'prospek'
                        });
                    } else {
                        globalFunction.ag('danger',['Data gagal dihapus']);
                    }
                    console.log(R);
                    globalFunction.closeModalLoading();
                }, function myError(R){ 
                    console.log(R.statusText); 
                    globalFunction.ag('danger',[R]); 
                    globalFunction.closeModalLoading(); 
                });
            });
            
        };
        
        $scope.viewKontak = function(id){
            apiData.get_view({
                gl      : true,
                api     : apiBase + 'prospek/get_kontakid/?id='+id,
                scope   : $scope,
                fd      : 'formDataIdentitasIndividuKontak',
                title   : 'View Identitas - Kontak'
            });
            $scope.$watch('formDataIdentitasIndividuKontak',function(){
                $rootScope.ROW_VIEW = [
//                    { k : 'Id', v : $scope.formDataIdentitasIndividuKontak.PR_INDIVIDU_KONTAK_ID },
                    { k : 'Jenis Kontak', v : $scope.formDataIdentitasIndividuKontak.MS_TIPE_KONTAK_DESKRIPSI },
                    { k : 'Kontak', v : $scope.formDataIdentitasIndividuKontak.PR_KONTAK },
                    { k : 'Kontak Utama', v : $scope.formDataIdentitasIndividuKontak.PR_KONTAK_UTAMA, t : 'yesorno', tv : 1 }
                ];
            });
        };
        
        $scope.formValid = function(){
            var e = globalFunction.formValidation({
                scope : $scope,
                form  : 'formDataIdentitasIndividuKontak',
                field : [
                    { fn : 'MS_TIPE_KONTAK',  fk : 'Tipe kontak' },
                    { fn : 'PR_KONTAK',  fk : 'Kontak' }
                ]
            });
            return e;
        };
        
    });
    
/* Prospek Kategori */    

App.controller('kategoriCtrl', function($scope){
    
    $scope.formDataKategori = {};

    $scope.processFormKategori = function() {
        console.log($scope.formDataKategori);
    };
    
});

/* Prospek Keluarga */

App.controller('keluargaCtrl', function($scope,apiData,$stateParams,getKelengkapanDataById) {
    
        apiData.get_allDataCalonDebiturPerId($scope, $stateParams.id);
        
    })
    
    .controller('keluargaData',function($scope,globalFunction,$http,apiBase,$stateParams,postDataKeluarga){
        $scope.formDataKeluarga = {};

        $scope.get_datakeluarga = function(id){
            globalFunction.openModalLoading();
            $http({
                method : "GET",
                url : apiBase + 'prospek/get_datakeluarga/?id='+id,
                dataType: 'json',
                headers: { 'Content-Type':'application/json' },
            }).then(function mySuccess(R) {
                $scope.formDataKeluarga = (typeof R.data !== 'undefined') ? R.data[0] : [];
                console.log(R);
                globalFunction.closeModalLoading();
            }, function myError(R) { 
                console.log(R.statusText); 
                globalFunction.ag('danger',[R]); 
                globalFunction.closeModalLoading(); 
            });
            
        };
        $scope.get_datakeluarga($stateParams.id);
		
		/*FZL*/
		$scope.formValid = function(){		
			var e = globalFunction.formValidation({
				scope : $scope,
				form  : 'formDataKeluarga',
				field : [
					{ fn : 'PR_NO_KK',  fk : 'Nomor Kartu Keluarga' },				
					{ fn : 'PR_JML_ANAK',  fk : 'Jumlah Anak' }					
				]
			});
			return e;
		};

        $scope.processDataKeluarga = function(){			
			if ($scope.formValid()){
				globalFunction.openModalLoading();
				$scope.formDataKeluarga.DB_PROSPEK_ID = $stateParams.id;	
				if (typeof $scope.formDataKeluarga.PR_JML_ANAK == undefined) {
				  $scope.formDataKeluarga.PR_JML_ANAK = 0;
				}			
				var data = $scope.formDataKeluarga;
				postDataKeluarga.uploadFileToUrl(data,$scope);			
			}
        };
        
    })
    
    .controller('keluargaDetailCtrl', function(modalService,$scope,globalFunction,$http,apiBase,$stateParams,apiData,$rootScope,getKelengkapanDataById){
        
        $scope.formDataKeluargaDetail = {};

        $scope.dtFDMB; //new Date(); FZL remark new date 6/4/2018
		$scope.dtFDTL;
        
        $scope.processDetailKeluarga = function(){
            if ($scope.formValid()){
                $scope.formDataKeluargaDetail.DB_PROSPEK_ID = $stateParams.id;
                apiData.post({
                    gl      : true,
                    api     : apiBase+'prospek/post_detailkeluarga',
                    data    : $scope.formDataKeluargaDetail,
                    scope   : $scope,
                    type    : 'tolist',
                    reload  : 'getdetailKeluargaList',
                    fd      : 'formDataKeluargaDetail',
                    // resetdate : [
                        // { k : 'dtFDMB', v : '' },//new Date() }, //FZL remark new date 6/4/2018
                        // { k : 'dtFDTL', v : '' }
                    // ]
					callbacksuccess : function(){
						$scope.resetFormDataKeluargaDetail
					}
                });		
				
	
				
				
				
            }
        };
        
        $scope.getdetailKeluargaList = function(id){
            apiData.get({
                gl      : false,
                api     : apiBase+'prospek/get_detailkeluargalist/?id='+id,
                scope   : $scope,
                sn      : 'detailKeluargaList',
                type    : 'tolist',
            });
        };
        $scope.getdetailKeluargaList($stateParams.id);
        
        $scope.editDetailKeluarga = function(id){
			
			$scope.dtFDMB = '';
			$scope.dtFDTL = '';
			
            apiData.get({
                gl      : false,
                api     : apiBase+'prospek/get_detailkeluargaid/?id='+id,
                scope   : $scope,
                sn      : 'formDataKeluargaDetail',
                setdate : [
                    { k : 'dtFDMB', v : 'PR_MASA_BERLAKU_IDENTITAS' },
                    { k : 'dtFDTL', v : 'PR_TANGGAL_LAHIR' }
                ],
                callbacksuccess : function(){
                    if ($scope.formDataKeluargaDetail.PR_MASA_BERLAKU_IDENTITAS == '9999-12-31')
                        $scope.formDataKeluargaDetail.masa_berlaku_identitas_seumur_hidup = 1;
                }
            }); 
        };
        
        $scope.deleteDetailKeluarga = function(d){
            modalService.showModal({}, {
                closeButtonText: 'Batal',
                actionButtonText: 'Hapus',
                headerText: 'Hapus Data Keluarga',
                bodyText: 'Apakah anda yakin menghapus data keluarga ini ?'
            }).then(function (result) {
                apiData.post({
                    gl      : true,
                    api     : apiBase+'prospek/delete_detailkeluarga',
                    data    : d,
                    scope   : $scope,
                    type    : 'tolist',
                    reload  : 'getdetailKeluargaList'
                });
            });
            
        };
        
        $scope.viewDetailKeluarga = function(id){
            apiData.get_view({
                gl      : true,
                api     : apiBase + 'prospek/get_detailkeluargaid/?id='+id,
                scope   : $scope,
                fd      : 'formDataKeluargaDetail',
                title   : 'View Identitas - Detail Keluarga'
            });
            $scope.$watch('formDataKeluargaDetail',function(){
                $rootScope.ROW_VIEW = [
//                    { k : 'Id', v : $scope.formDataKeluargaDetail.PR_INDIVIDU_KELUARGA_ID },
                    { k : 'Status Hubungan Keluarga', v : $scope.formDataKeluargaDetail.MS_JENIS_STATUS_HUBUNGAN_KELUARGA },
                    { k : 'Nama lengkap', v : $scope.formDataKeluargaDetail.PR_NAMA_LENGKAP },
                    { k : 'Jenis Kelamin', v : $scope.formDataKeluargaDetail.MS_JENIS_KELAMIN },
                    { k : 'Jenis Identitas', v : $scope.formDataKeluargaDetail.MS_JENIS_IDENTITAS },
                    { k : 'Nomor Identitas', v : $scope.formDataKeluargaDetail.PR_NO_IDENTITAS },
                    { k : 'Masa Berlaku', v : $scope.formDataKeluargaDetail.PR_MASA_BERLAKU_IDENTITAS },
                    { k : 'Tempat Lahir', v : $scope.formDataKeluargaDetail.PR_TEMPAT_LAHIR },
                    { k : 'Tanggal Lahir', v : $scope.formDataKeluargaDetail.PR_TANGGAL_LAHIR },
                    { k : 'Pekerjaan', v : $scope.formDataKeluargaDetail.MS_PEKERJAAN },
                    { k : 'Nomor Handphone', v : $scope.formDataKeluargaDetail.PR_NO_HP },
                    { k : 'Nomor Telepon', v : $scope.formDataKeluargaDetail.PR_NO_TELP }
                ];
            });
        };
        
        $scope.formValid = function(){
            var e = globalFunction.formValidation({
                scope : $scope,
                form  : 'formDataKeluargaDetail',
                field : [
                    { fn : 'MS_STATUS_HUBUNGAN_KELUARGA_ID',  fk : 'Status hubungan' },
                    { fn : 'PR_NAMA_LENGKAP',  fk : 'Nama lengkap' },
                    { fn : 'MS_JENIS_KELAMIN_ID',  fk : 'Jenis kelamin' },
                    { fn : 'MS_JENIS_IDENTITAS_ID',  fk : 'Jenis identitas' },
                    { fn : 'PR_NO_IDENTITAS',  fk : 'Nomor identitas' },
                    { fn : 'PR_TEMPAT_LAHIR',  fk : 'Tempat lahir' },
                    { fn : 'PR_TANGGAL_LAHIR',  fk : 'Tanggal lahir' },
                    { fn : 'MS_PEKERJAAN_ID',  fk : 'Pekerjaan' }//,
                    /*{ fn : 'PR_NO_HP',  fk : 'No HP' } FZL 6/4/2018  */
                ],
                callback : function(){
                    if (!$scope.formDataKeluargaDetail.masa_berlaku_identitas_seumur_hidup && !$scope.formDataKeluargaDetail.PR_MASA_BERLAKU_IDENTITAS) {
                        $scope.formValidMsg.push('Masa berlaku identitas harus diisi');
                    }      
                }
            });
            return e;
        };
        
        $scope.resetFormDataKeluargaDetail =  function(){
            $scope.formDataKeluargaDetail = {};			
			$scope.dtFDMB = '';
			$scope.dtFDTL = '';
        };
        
    });

/* Prospek Aplikasi */

App.controller('aplikasiCtrl', function($scope,globalFunction,$http,apiBase,$stateParams,apiData,$rootScope,getKelengkapanDataById) {
    
        apiData.get_allDataCalonDebiturPerId($scope,$stateParams.id);
        
        apiData.alamatExe($scope);
        
        $scope.formDataAplikasi = {};
    
        $scope.processFormAplikasi = function(){
            $scope.formDataAplikasi.DB_PROSPEK_ID = $stateParams.id;
			if ($scope.formValid()){
				apiData.post({
					gl      : true,
					api     : apiBase+'prospek/post_datapembiayaan',
					data    : $scope.formDataAplikasi,
					scope   : $scope
				});
			};
        };
		
        /*FZL tambah validasi*/
        $scope.formValid = function(){			
//            if ($rootScope.thisState == 'prospek.aplikasi.datapembiayaan'){				
                var e = globalFunction.formValidation({
                        scope : $scope,
                        form  : 'formDataAplikasi',
                        field : [
                                { fn : 'MS_PRODUK_ID',  fk : 'Rencana Product' },				
                                { fn : 'PR_RENCANA_PLAFOND',  fk : 'Rencana Plafond' },
                                { fn : 'PR_JANGKA_WAKTU',  fk : 'Jangka Waktu' },				
                                { fn : 'PR_KEMAMPUAN_ANGSURAN',  fk : 'Kemampuan Angsuran' },
                                { fn : 'MS_TUJUAN_PEMBIAYAAN_ID',  fk : 'Tujuan Pembiayaan' }					
                        ]
                });
                return e;
//            }
        };

        $scope.getFormDataAplikasi = function(id){
            apiData.get({
                gl      : true,
                api     : apiBase+'prospek/get_datapembiayaan/?id='+id,
                scope   : $scope,
                sn      : 'formDataAplikasi',
                type    : '',
                callbacksuccess : function(R){
//                    apiData.getProdukDetail({id : $scope.formDataAplikasi.MS_PRODUK_ID, scope : $scope, sn : 'formDataAplikasi'});
                    apiData.getCalculateProdukProgram({id_produk : $scope.formDataAplikasi.MS_PRODUK_ID, id_program : 304, scope : $scope, sn : 'formDataAplikasi', id_pembiayaan : $scope.formDataAplikasi.MS_JENIS_PEMBIAYAAN_ID});
                    console.log($scope.formDataAplikasi);
                }
            });
        };
        $scope.getFormDataAplikasi($stateParams.id);
        
//        $scope.getDetailProduk = function(id){
//            apiData.getProdukDetail({id : id, scope : $scope, sn : 'formDataAplikasi', t : 'onchange'});
//        };
        
        $scope.getCalculateProdukProgram = function(d){
            apiData.getCalculateProdukProgram({id_produk : d['id_produk'], id_program : 304, scope : $scope, sn : 'formDataAplikasi', t : 'onchange', id_pembiayaan : d['id_pembiayaan']});
        };
        
        $scope.$watchGroup(['formDataAplikasi.PR_RENCANA_PLAFOND','formDataAplikasi.PR_JANGKA_WAKTU'],function(nV){
            if (nV){
                $scope.checkTenorMinMax = function(){
                    if (parseInt($scope.formDataAplikasi.PR_JANGKA_WAKTU) < parseInt($scope.formDataAplikasi.MS_TENOR_MIN) || parseInt($scope.formDataAplikasi.PR_JANGKA_WAKTU) > parseInt($scope.formDataAplikasi.MS_TENOR_MAX)){
                        $scope.formDataAplikasi.PR_JANGKA_WAKTU = $scope.formDataAplikasi.MS_TENOR_MID;
                        globalFunction.ag('danger',['Tenor tidak kurang atau melebihi ketentuan yang berlaku']);
                    }
                };

                $scope.checkPlafondMinMax = function(){
                    if ($scope.formDataAplikasi.PR_RENCANA_PLAFOND < $scope.formDataAplikasi.MS_PLAFOND_MIN || $scope.formDataAplikasi.PR_RENCANA_PLAFOND > $scope.formDataAplikasi.MS_PLAFOND_MAX){
                        $scope.formDataAplikasi.PR_RENCANA_PLAFOND = $scope.formDataAplikasi.MS_PLAFOND_MID;
                        globalFunction.ag('danger',['Palfond tidak kurang atau melebihi ketentuan yang berlaku']);
                    }
                };
                console.log('PLAFOND',$scope.formDataAplikasi.PR_RENCANA_PLAFOND);
                 console.log($scope.formDataAplikasi);
            }
        });
        
    })
    
    .controller('aplikasiInformasiUsahaCtrl',function(modalService,getKelengkapanDataById,$scope,globalFunction,$http,apiBase,$stateParams,apiData,$rootScope){
        
//        $scope.aplikasiInformasiUsahaList = {};

        $scope.formDataAplikasiInformasiUsaha = {};
        
        $scope.processFormAplikasiInformasiUsaha = function(){
            if ($scope.formValid()){
                $scope.formDataAplikasiInformasiUsaha.DB_PROSPEK_ID = $stateParams.id;
                apiData.post({
                    gl      : true,
                    api     : apiBase+'prospek/post_infousaha',
                    data    : $scope.formDataAplikasiInformasiUsaha,
                    scope   : $scope,
                    type    : 'tolist',
                    reload  : 'getInformasiUsahaList',
                    fd      : 'formDataAplikasiInformasiUsaha'
                });
            }
        };
        
        $scope.getInformasiUsahaList = function(id){
            apiData.get({
                gl      : false,
                api     : apiBase+'prospek/get_infousahalist/?id='+id,
                scope   : $scope,
                sn      : 'aplikasiInformasiUsahaList',
                type    : 'tolist'
            });
        };
        $scope.getInformasiUsahaList($stateParams.id);
        
        $scope.editInformasiUsaha = function(id){
            apiData.get({
                gl      : false,
                api     : apiBase+'prospek/get_infousahaid/?id='+id,
                scope   : $scope,
                sn      : 'formDataAplikasiInformasiUsaha',
                alamat  : true,
                callbacksuccess : function(R){
                    $scope.formDataAplikasiInformasiUsaha = {};
                    $scope.formDataAplikasiInformasiUsaha = (typeof R.data !== 'undefined' && R.data !== '') ? globalFunction.collectObject(R.data.usaha,R.data.alamat_usaha[0]) : [];
																													
                    if (typeof R.data !== 'undefined') {										
                            $scope.formDataAplikasiInformasiUsaha.PR_LAMA_USAHA_TAHUN = Math.floor(parseInt(R.data.usaha.PR_LAMA_USAHA) / 12);
                            $scope.formDataAplikasiInformasiUsaha.PR_LAMA_USAHA_BULAN = parseInt(R.data.usaha.PR_LAMA_USAHA) % 12; 					

                            $scope.formDataAplikasiInformasiUsaha.PR_LAMA_MENEMPATI_TAHUN = Math.floor(parseInt(R.data.alamat_usaha[0].PR_LAMA_MENEMPATI) / 12);
                            $scope.formDataAplikasiInformasiUsaha.PR_LAMA_MENEMPATI_BULAN = parseInt(R.data.alamat_usaha[0].PR_LAMA_MENEMPATI) % 12; 					
                    }
                    console.log('alamat',R.data.alamat_usaha[0]);
                    console.log('usaha',R.data.usaha);
                }
            });
        };
        
        $scope.deleteInformasiUsaha = function(d){
            modalService.showModal({}, {
                closeButtonText: 'Batal',
                actionButtonText: 'Hapus',
                headerText: 'Hapus Data Usaha',
                bodyText: 'Apakah anda yakin menghapus data usaha ini ?'
            }).then(function (result) {
                apiData.post({
                    gl      : true,
                    api     : apiBase+'prospek/delete_infousaha',
                    data    : d,
                    scope   : $scope,
                    type    : 'tolist',
                    reload  : 'getInformasiUsahaList'
                });
            });
        };
        
        $scope.resetFormAplikasiInformasiUsaha = function(){
            $scope.formDataAplikasiInformasiUsaha = {};
        };
        
        $scope.viewInformasiUsaha = function(id){
            apiData.get_view({
                gl      : true,
                api     : apiBase + 'prospek/get_infousahaid/?id='+id,
                scope   : $scope,
                fd      : 'formDataAplikasiInformasiUsaha',
                collect : function(R){										
                    $scope.formDataAplikasiInformasiUsaha = (typeof R.data !== 'undefined' && R.data !== '') ? globalFunction.collectObject(R.data.usaha,R.data.alamat_usaha[0]) : [];
                },
                title   : 'View Aplikasi - Informasi Usaha'
            });
            $scope.$watch('formDataAplikasiInformasiUsaha',function(){
                $rootScope.ROW_VIEW = [
//                    { k : 'Id', v : $scope.formDataAplikasiInformasiUsaha.PR_INDIVIDU_USAHA_ID },
                    { k : 'Jenis Usaha', v : $scope.formDataAplikasiInformasiUsaha.MS_JENIS_USAHA },
                    { k : 'Omset per hari', v : $scope.formDataAplikasiInformasiUsaha.PR_OMSET_HARIAN },
                    { k : 'Lama Usaha (bulan)', v : $scope.formDataAplikasiInformasiUsaha.PR_LAMA_USAHA },
                    { k : 'Jumlah karyawan', v : $scope.formDataAplikasiInformasiUsaha.PR_JUMLAH_KARYAWAN },
                    { k : 'Alamat Usaha', v : $scope.formDataAplikasiInformasiUsaha.PR_ALAMAT },
                    { k : 'RT', v : $scope.formDataAplikasiInformasiUsaha.PR_RT },
                    { k : 'RW', v : $scope.formDataAplikasiInformasiUsaha.PR_RW },
                    { k : 'Provinsi', v : $scope.formDataAplikasiInformasiUsaha.MS_PROVINSI },
                    { k : 'Kabupaten / Kota', v : $scope.formDataAplikasiInformasiUsaha.MS_KABKOT },
                    { k : 'Kecamatan', v : $scope.formDataAplikasiInformasiUsaha.MS_KECAMATAN },
                    { k : 'Kelurahan', v : $scope.formDataAplikasiInformasiUsaha.MS_KELDES },
                    { k : 'Kode Pos', v : $scope.formDataAplikasiInformasiUsaha.MS_KODE_POS_ID },
                    { k : 'Telepon', v : $scope.formDataAplikasiInformasiUsaha.PR_NO_TELP_USAHA },
                    { k : 'Lama Menempati (bulan)', v : $scope.formDataAplikasiInformasiUsaha.PR_LAMA_MENEMPATI },
                    { k : 'Status Tempat', v : $scope.formDataAplikasiInformasiUsaha.MS_STATUS_TEMPAT }
                ];
            });
        };
        
        $scope.formValid = function(){
            var e = globalFunction.formValidation({
                scope : $scope,
                form  : 'formDataAplikasiInformasiUsaha',
                field : [
                    { fn : 'MS_JENIS_USAHA_ID',  fk : 'Jenis usaha' },
                    { fn : 'PR_NAMA_USAHA',  fk : 'Nama usaha' },
                    { fn : 'PR_OMSET_HARIAN',  fk : 'Omset harian' },
                    { fn : 'PR_LAMA_USAHA',  fk : 'Lama usaha' },
                    { fn : 'PR_JUMLAH_KARYAWAN',  fk : 'Jumlah karyawan' },
                    { fn : 'PR_ALAMAT',  fk : 'Alamat' },
                    { fn : 'PR_RT',  fk : 'RT' },
                    /*{ fn : 'PR_RW',  fk : 'RW' }, remark FZL 9/4/2018 */
                    { fn : 'MS_PROVINSI_ID',  fk : 'Provinsi' },
                    { fn : 'MS_KABKOT_ID',  fk : 'Kabupaten / kota' },
                    { fn : 'MS_KECAMATAN_ID',  fk : 'Kecamatan' },
                    { fn : 'MS_KODE_POS_ID',  fk : 'Kode pos' },
                    { fn : 'PR_NO_TELP_USAHA',  fk : 'No telpon usaha' },
                    { fn : 'PR_LAMA_MENEMPATI',  fk : 'Lama menempati' },
                    { fn : 'MS_STATUS_TEMPAT_ID',  fk : 'Status tempat' }
                ]
            });
            return e;
        };
		
		/*FZL start 11/12/2018*/
		$scope.postUsahaPriority = function(id){						
			// $scope.aplikasiInformasiUsahaList = {};
			$scope.aplikasiInformasiUsahaList.DB_PROSPEK_ID = $stateParams.id;
			$scope.aplikasiInformasiUsahaList.PR_INDIVIDU_USAHA_ID = id;
			apiData.post({
				gl      : false,
				api     : apiBase+'survey/post_jenisusahautama',
				data    : $scope.aplikasiInformasiUsahaList,
				scope   : $scope,
				type    : 'tolist',
				reload  : 'getInformasiUsahaList',
				fd      : 'aplikasiInformasiUsahaList'
			});
        };		
		/*FZL end 11/12/2018*/
        
        $scope.$watchGroup(['formDataAplikasiInformasiUsaha.PR_LAMA_MENEMPATI_TAHUN','formDataAplikasiInformasiUsaha.PR_LAMA_MENEMPATI_BULAN'],function(nV){
            if (nV){
                $scope.formDataAplikasiInformasiUsaha.PR_LAMA_MENEMPATI = parseInt( $scope.formDataAplikasiInformasiUsaha.PR_LAMA_MENEMPATI_TAHUN * 12 ) + parseInt($scope.formDataAplikasiInformasiUsaha.PR_LAMA_MENEMPATI_BULAN);
            }
        });
        
        $scope.$watchGroup(['formDataAplikasiInformasiUsaha.PR_LAMA_USAHA_TAHUN','formDataAplikasiInformasiUsaha.PR_LAMA_USAHA_BULAN'],function(nV){
            if (nV){
                $scope.formDataAplikasiInformasiUsaha.PR_LAMA_USAHA = parseInt( $scope.formDataAplikasiInformasiUsaha.PR_LAMA_USAHA_TAHUN * 12 ) + parseInt($scope.formDataAplikasiInformasiUsaha.PR_LAMA_USAHA_BULAN);
            }
        });
		
    });

/* Prospek Agunan */

App.controller('agunanCtrl', function(modalService,$scope,globalFunction,$http,apiBase,$stateParams,apiData,getKelengkapanDataById,$rootScope) {
    
    apiData.get_allDataCalonDebiturPerId($scope,$stateParams.id);

    $scope.formDataAgunan = {};

    $scope.processFormAgunan = function() {
        console.log($scope.formDataAgunan);
		
		if ($scope.formValid()){
			globalFunction.openModalLoading();
			$scope.formDataAgunan.DB_PROSPEK_ID = $stateParams.id;
			var data = $scope.formDataAgunan;    
			$http({
				method: 'POST',
				url: apiBase + 'prospek/post_agunan',
				headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
				data: globalFunction.serializeObj(data)
			}).then(function(R){
				if (R.status == '200' && typeof R.data.status && R.data.status == 'Success') {
					globalFunction.ag('success',['Data berhasil disimpan']);
					$scope.getAgunanList($stateParams.id);
					$scope.formDataAgunan = {};
					getKelengkapanDataById.e({
						scope   : $rootScope,
						id      : $stateParams.id,
						type    : 'prospek'
					});
				} else {
					globalFunction.ag('danger',['Data gagal disimpan']);
				}
				console.log(R);
				globalFunction.closeModalLoading();
			}, function myError(R){ 
				console.log(R.statusText);
				globalFunction.ag('danger',[R]); 
				globalFunction.closeModalLoading();
			});
		};
    };
	
	/*FZL tambah validasi*/
	$scope.formValid = function(){
        var e = globalFunction.formValidation({
            scope : $scope,
            form  : 'formDataAgunan',
            field : [
                { fn : 'MS_JENIS_AGUNAN_ID',  fk : 'Jenis Agunan' },               
                { fn : 'PR_NO_DOKUMEN',  fk : 'Nomor Dokumen' }       
            ]
        });
        return e;
    };
    
    $scope.getAgunanList = function(id){        
        
        $http({
            method : "GET",
            url : apiBase + 'prospek/get_agunanlist/?id='+id,
            dataType: 'json',
            headers: { 'Content-Type':'application/json' },
        }).then(function mySuccess(R) {
            console.log(R);
            $scope.agunanList = (typeof R.data !== 'undefined') ? R.data : [];

        }, function myError(R) { 
            console.log(R.statusText);
            globalFunction.ag('danger',[R]); 
        });
    };
    $scope.getAgunanList($stateParams.id);
    
    $scope.editAgunan = function(id){
        globalFunction.openModalLoading();
        $http({
            method : "GET",
            url : apiBase + 'prospek/get_agunanid/?id='+id,
            dataType: 'json',
            headers: { 'Content-Type':'application/json' },
        }).then(function mySuccess(R) {
            $scope.formDataAgunan = (typeof R.data !== 'undefined') ? R.data[0] : [];
            console.log(R);
            globalFunction.closeModalLoading();
        }, function myError(R) { 
            console.log(R.statusText);
            globalFunction.ag('danger',[R]); 
        });
    };
    
    $scope.deleteAgunan = function(data){
        
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Hapus',
            headerText: 'Hapus Data Agunan',
            bodyText: 'Apakah anda yakin menghapus data agunan ini ?'
        }).then(function (result) {

            globalFunction.openModalLoading();
            $http({
                method: 'POST',
                url: apiBase + 'prospek/delete_agunan',
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data: globalFunction.serializeObj(data)
            }).then(function(R){
                if (R.status == '200' && typeof R.data.status && R.data.status == 'Success') {
                    globalFunction.ag('success',['Data berhasil dihapus']);
                    $scope.getAgunanList($stateParams.id);
                    getKelengkapanDataById.e({
                            scope   : $rootScope,
                            id      : $stateParams.id,
                            type    : 'prospek'
                        });
                } else {
                    globalFunction.ag('danger',['Data gagal dihapus']);
                }
                console.log(R);
                globalFunction.closeModalLoading();
            }, function myError(R){ 
                console.log(R.statusText);
                globalFunction.ag('danger',[R]); 
                globalFunction.closeModalLoading();
            });

        });
        
    };
    
    $scope.viewAgunan = function(id){
        apiData.get_view({
            gl      : true,
            api     : apiBase + 'prospek/get_agunanid/?id='+id,
            scope   : $scope,
            fd      : 'formDataAgunan',
            title   : 'View Rencana Agunan'
        });
        $scope.$watch('formDataAgunan',function(){
            $rootScope.ROW_VIEW = [
//                { k : 'Id', v : $scope.formDataAgunan.PR_INDIVIDU_RENCANA_AGUNAN_ID },
                { k : 'Jenis Agunan', v : $scope.formDataAgunan.MS_JENIS_AGUNAN },
                { k : 'Nomor Dokumen', v : $scope.formDataAgunan.PR_NO_DOKUMEN },
                { k : 'Keterangan', v : $scope.formDataAgunan.PR_KETERANGAN_AGUNAN }
            ];
        });
    };
    
	
	
	$scope.resetformDataAgunan = function(){
        $scope.formDataAgunan = {};
    };
	
});

/* Prospek Dokumen */

App.controller('dokumenCtrl', function(modalService,$scope,$stateParams,apiData,globalFunction,$http,apiBase,$stateParams,postDokumen,getKelengkapanDataById,$rootScope) {
    
    apiData.get_allDataCalonDebiturPerId($scope,$stateParams.id);

    $scope.formDataDokumen = {};

    $scope.processFormDokumen = function() {
//            if ($scope.formDataDokumen.PR_DOKUMEN)
//                $scope.formDataDokumen.PR_PATH_DOKUMEN = 'N';
            
		if ($scope.formValid()){
			globalFunction.openModalLoading();
			$scope.formDataDokumen.DB_PROSPEK_ID = $stateParams.id;
			var data = $scope.formDataDokumen;    
			console.log(data);
			postDokumen.uploadFileToUrl(data,$scope,function(R){
				$scope.formDataDokumen.PR_DOKUMEN = null;
			});
		};
    };

	/*FZL tambah validasi*/
	$scope.formValid = function(){
        var e = globalFunction.formValidation({
            scope : $scope,
            form  : 'formDataDokumen',
            field : [
                { fn : 'MS_JENIS_DOKUMEN_ID',  fk : 'Jenis Dokumen' },
                { fn : 'DB_HEADER',  fk : 'Kategori Dokumen' },
                { fn : 'PR_NOMOR_DOKUMEN',  fk : 'Nomor Dokumen' },
                { fn : 'PR_DOKUMEN',  fk : 'Upload File Dokumen' }                
            ]
        });
        return e;
    };	
    
    $scope.getDokumenList = function(id){
        
        $http({
            method  : "GET",
            url     : apiBase + 'prospek/get_dokumenlist/?id='+id,
            dataType: 'json',
            headers : { 'Content-Type':'application/json' },
        }).then(function mySuccess(R) {
            console.log(R);
            $scope.dokumenList = (typeof R.data !== 'undefined') ? R.data : [];

        }, function myError(R) { 
            console.log(R.statusText); 
            globalFunction.ag('danger',[R]); 
        });
    };
    $scope.getDokumenList($stateParams.id);
    
    $scope.editDokumen = function(id){
        globalFunction.openModalLoading();
        $http({
            method : "GET",
            url : apiBase + 'prospek/get_dokumenid/?id='+id,
            dataType: 'json',
            headers: { 'Content-Type':'application/json' }
        }).then(function mySuccess(R) {
            $scope.formDataDokumen = (typeof R.data !== 'undefined') ? R.data[0] : [];
            console.log(R);
			console.log($scope.formDataDokumen.MS_JENIS_DOKUMEN_ID);
            globalFunction.closeModalLoading();
        }, function myError(R) { 
            console.log(R.statusText);
            globalFunction.ag('danger',[R]); 
            globalFunction.closeModalLoading();
        });
    };
    
    $scope.deleteDokumen = function(data){
        
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Hapus',
            headerText: 'Hapus Dokumen',
            bodyText: 'Apakah anda yakin menghapus dokumen ini ?'
        }).then(function (result) {
            
            globalFunction.openModalLoading();
            $http({
                method: 'POST',
                url: apiBase + 'prospek/delete_dokumen',
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data: globalFunction.serializeObj(data)
            }).then(function(R){
                if (R.status == '200' && typeof R.data.status && R.data.status == 'Success') {
                    globalFunction.ag('success',['Data berhasil dihapus']);
                    $scope.getDokumenList($stateParams.id);
                    getKelengkapanDataById.e({
                            scope   : $rootScope,
                            id      : $stateParams.id,
                            type    : 'prospek'
                        });
                } else {
                    globalFunction.ag('danger',['Data gagal dihapus']);
                }
                console.log(R);
                globalFunction.closeModalLoading();
            }, function myError(R){ 
                console.log(R.statusText); 
                globalFunction.ag('danger',[R]); 
                globalFunction.closeModalLoading();
            });
            
        });
        
        
    };
    
    $scope.viewDokumen = function(id){
        apiData.get_view({
            gl      : true,
            api     : apiBase + 'prospek/get_dokumenid/?id='+id,
            scope   : $scope,
            fd      : 'formDataDokumen',
            title   : 'View Dokumen'
        });
        $scope.$watch('formDataDokumen',function(){
            $rootScope.ROW_VIEW = [
                // { k : 'Id', v : $scope.formDataDokumen.PR_INDIVIDU_DOKUMEN_ID },
                { k : 'Jenis Dokumen', v : $scope.formDataDokumen.MS_JENIS_DOKUMEN },
                { k : 'Kategori Dokumen', v : $scope.formDataDokumen.DB_HEADER },
                { k : 'Nomor Dokumen', v : $scope.formDataDokumen.PR_NOMOR_DOKUMEN },
                { k : 'File', v : $scope.formDataDokumen.NODE_ID, t : 'file', d : $scope.formDataDokumen.PR_PATH_DOKUMEN }
            ];
        });
    };
    
    $scope.resetFormDataDokumen = function(e){
        $scope.formDataDokumen = {};
        $scope.formDataDokumen.PR_DOKUMEN = null;
    };
    
});

/* Prospek AOM */

App.controller('aomInfoCtrl', function($scope,$stateParams,apiData,globalFunction,$http,apiBase,$stateParams,getKelengkapanDataById) {
    
        apiData.get_allDataCalonDebiturPerId($scope,$stateParams.id);

        $scope.formDataAom = {};

        $scope.getAOM = function(id){
            apiData.get({
                gl      : false,
                api     : apiBase+'prospek/get_aom/?id='+id,
                scope   : $scope,
                sn      : 'formDataAom',
                type    : 'object'
            });
        };
        $scope.getAOM($stateParams.id);
    })

    .controller('aomKunjunganCtrl',function($scope,$rootScope,globalFunction,$http,apiBase,$stateParams,apiData){
        
        $scope.modalAK = function(){
            var m = globalFunction.openModal('partials/modals/modal-aom-kunjungan.html','modal-form modal-form-50 modal-aom-kunjungan','modalAomKunjunganCtrl');
            $rootScope.closemodalAK = function(){
                m.close();
            };
        };
        
        $rootScope.getlistKIA = function(id){
            apiData.get({
                gl      : false,
                api     : apiBase+'prospek/get_aomkunjunganlist/?id='+id,
                scope   : $rootScope,
                sn      : 'listKIA',
                type    : 'tolist'
            });
        };
        $scope.getlistKIA($stateParams.id);

        $scope.editKIA = function(id){
            apiData.get({
                gl      : false,
                api     : apiBase+'prospek/get_aomkunjunganid/?id='+id,
                scope   : $rootScope,
                sn      : 'fdKIA',
                setdate : [{ k : 'dtKA', v : 'PR_TGL_REALISASI_KUNJUNGAN' }]
            });
            $scope.modalAK(); 
        };

        $scope.deleteKIA = function(d){
            apiData.post({
                gl      : true,
                api     : apiBase+'prospek/delete_aom_kunjungan',
                data    : d,
                scope   : $rootScope,
                type    : 'tolist',
                reload  : 'getlistKIA'
            });
        };
        
        $scope.viewKIA = function(id){
            apiData.get_view({
                gl      : true,
                api     : apiBase+'prospek/get_aomkunjunganid/?id='+id,
                scope   : $rootScope,
                fd      : 'fdKIA',
                title   : 'View Kunjungan AOM'
            });
            $rootScope.$watch('fdKIA',function(){
                $rootScope.ROW_VIEW = [
//                    { k : 'Id', v : $rootScope.fdKIA.PR_INDIVIDU_KUNJUNGAN_DEBITUR_ID },
                    { k : 'Tanggal Kunjungan', v : $rootScope.fdKIA.PR_TGL_REALISASI_KUNJUNGAN },
                    { k : 'Keterangan Kunjungan', v : $rootScope.fdKIA.PR_KETERANGAN_KUNJUNGAN }
                ];
            });
        };
        
    })
    .controller('modalAomKunjunganCtrl',function($scope,$stateParams,globalFunction,apiBase,$http,apiData,$rootScope){
        
        $scope.postKIA = function(){
            $scope.fdKIA.DB_PROSPEK_ID = parseInt($stateParams.id);
            apiData.post({
                gl      : true,
                api     : apiBase+'prospek/post_aomkunjungan',
                data    : $scope.fdKIA,
                scope   : $scope,
                fd      : 'fdKIA',
                type    : 'tolist',
                reloadp : { k : 'getlistKIA', v : $stateParams.id },
                ag      : 'on-modal',
                cm      : 'closemodalAK'
            });
        };
        
    });
    
App.controller('cekSIDCtrl', function($rootScope,$scope,$stateParams,apiData,globalFunction,$http,apiBase,$stateParams,getKelengkapanDataById) {
    
    $scope.fdCSID = {};
    
    $scope.fdCSRP = {};
    
    $scope.postCSID = function(){
        $scope.fdCSID.DB_PROSPEK_ID = $stateParams.id;
        apiData.post({
            gl      : true,
            api     : apiBase+'prospek/post_ceksid',
            data    : $scope.fdCSID,
            scope   : $scope,
            reload  : 'getCSID'
        });
    }; 
    
    $scope.getCSID = function(){
        $scope.fdCSID.DB_PROSPEK_ID = $stateParams.id;
        apiData.get({
            gl      : true,
            api     : apiBase+'prospek/get_ceksid/?id='+$scope.fdCSID.DB_PROSPEK_ID,
            scope   : $scope,
            sn      : 'fdCSID'
        });
    };
    $scope.getCSID();
    
    $scope.getlistCSRP = function(id,flag){
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_rincianpinjamanlist/?id='+id+'&flag='+flag,
            scope   : $scope,
            sn      : 'listCSRP'+flag,
            type    : 'tolist'
        });
    };
    $scope.getlistCSRP($stateParams.id,'DEBITUR');
    $scope.getlistCSRP($stateParams.id,'KELUARGA');
    $scope.getlistCSRP($stateParams.id,'PENJAMIN');
    
    $scope.getlistCSRPDOC = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'prospek/get_dokumensid/?id='+id,
            scope   : $scope,
            sn      : 'listCSRPDOC',
            type    : 'tolist'
        });
    };
    $scope.getlistCSRPDOC($stateParams.id);
    
    $scope.viewCSRP = function(id){
        apiData.get_view({
            gl      : true,
            api     : apiBase+'survey/get_rincianpinjamanid/?id='+id,
            scope   : $scope,
            fd      : 'fdCSRP',
            title   : 'Hasil Cek SLIK'
        });
        $scope.$watch('fdCSRP',function(){
            $rootScope.ROW_VIEW = [
                { k : 'Nama Bank', v : $scope.fdCSRP.MS_BANK_ID_DESKRIPSI },
                { k : 'Plafond', v : $scope.fdCSRP.SV_PLAFOND, t : 'number' },
                { k : 'Baki Debet', v : $scope.fdCSRP.SV_BAKI_DEBET, t : 'number' },
                { k : 'Angsuran', v : $scope.fdCSRP.SV_ANGSURAN, t : 'number' },
                { k : 'Keterangan', v : $scope.fdCSRP.MS_TUJUAN_PEMBIAYAAN_ID_DESKRIPSI },
                { k : 'Jatuh Tempo', v : $scope.fdCSRP.SV_JATUH_TEMPO },
                { k : 'Kolektibilitas', v : $scope.fdCSRP.MS_KOLEKTIBILITAS_ID_DESKRIPSI }
            ];
        });
    };
    
});

App.controller('oneObligorCtrl', function($scope,$stateParams,apiData,globalFunction,$http,apiBase,$stateParams,getKelengkapanDataById) {
    
    $scope.fdOOB = {};
    
    $scope.getfdOOB = function(){
        $scope.fdOOB.DB_PROSPEK_ID = $stateParams.id;
        apiData.get({
            gl      : true,
            api     : apiBase+'prospek/get_individu_one_obligor/?id='+$scope.fdOOB.DB_PROSPEK_ID,
            scope   : $scope,
            sn      : 'fdOOB',
            type    : 'object'
        });
    };
    $scope.getfdOOB();
    
    $scope.postOOB = function(){
        $scope.fdOOB.DB_PROSPEK_ID = $stateParams.id;
        apiData.post({
            gl      : true,
            api     : apiBase+'prospek/post_one_obligor',
            data    : $scope.fdOOB,
            scope   : $scope,
            reload  : 'getfdOOB'
        });
    };
    
});

App.controller('prospekListCtrl', function($scope,$http,apiBase,globalFunction,apiData,$rootScope){
    
    $scope.fdPL = {};
    $scope.prospekList = [];
    $scope.fdPL.PAGE = 1;
    $scope.fdPL.MAX_SIZE = 5;
    $scope.fdPL.LIMIT = 10;
//    $scope.fdPL.TOTAL_ITEMS = 100;

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
    
    $scope.list = function(d){
        var p = '';
        if (d['MS_WILAYAH_ID'])
            p +=   'MS_WILAYAH_ID='+d['MS_WILAYAH_ID'];
        if (d['MS_KODE_CABANG'])
            p +=   '&MS_KODE_CABANG='+d['MS_KODE_CABANG'];
        if (d['MS_KODE_UNIT'])
            p +=   '&MS_KODE_UNIT='+d['MS_KODE_UNIT'];
        if (d['PAGE'])
            p +=   '&PAGE='+d['PAGE'];
        if (d['LIMIT'])
            p +=   '&LIMIT='+d['LIMIT'];
        if (d['SEARCH'])
            p +=   '&SEARCH='+d['SEARCH'];
        apiData.get({
            gl      : true,
            api     : apiBase + 'prospek/get_calonDebitur/?'+p,
            scope   : $scope,
            sn      : 'prospekList',
            type    : 'tolist',
            callbacksuccess : function(R){
//                $scope.fdPL.TOTAL_ITEMS = $scope.prospekList.length;
                $scope.prospekList_ = R.data.data;
                $scope.fdPL.TOTAL_ITEMS = R.data.len;
            }
        });
    };
    
    $scope.$watchGroup(['fdPL.MS_WILAYAH_ID','fdPL.MS_KODE_CABANG','fdPL.MS_KODE_UNIT','fdPL.PAGE','fdPL.LIMIT','fdPL.SEARCH'], function(newValues, oldValues, scope) {
        if (newValues) {
            $scope.list({
                'MS_WILAYAH_ID'     : typeof ($scope.fdPL.MS_WILAYAH_ID)!='undefined' ? $scope.fdPL.MS_WILAYAH_ID : '',
                'MS_KODE_CABANG'    : typeof ($scope.fdPL.MS_KODE_CABANG)!='undefined' ? $scope.fdPL.MS_KODE_CABANG : '',
                'MS_KODE_UNIT'      : typeof ($scope.fdPL.MS_KODE_UNIT)!='undefined' ? $scope.fdPL.MS_KODE_UNIT : '',
                'PAGE'              : typeof ($scope.fdPL.PAGE)!='undefined' ? $scope.fdPL.PAGE : '',
                'LIMIT'             : typeof ($scope.fdPL.LIMIT)!='undefined' ? $scope.fdPL.LIMIT : '',
                'SEARCH'            : typeof ($scope.fdPL.SEARCH)!='undefined' ? $scope.fdPL.SEARCH : ''
            });
        }
    });
    
    $scope.pageChanged = function(p){
        $scope.fdPL.PAGE = p;
    };
    
});

/*  ========================================================
 *  ######################### SURVEY #######################
 *  ======================================================== */

App.controller('surveyCtrl',function($stateParams,$http,apiBase,$scope,$rootScope,apiData,getKelengkapanDataById,globalFunction){
   // if (!$stateParams.id)
     //   window.location = '/';
     
    apiData.get_allDataCalonDebiturPerId($scope,$stateParams.id);
    
    $rootScope.PR_PROSPEK_ID = $stateParams.id;
    
    getKelengkapanDataById.e({
        scope   : $rootScope,
        id      : $stateParams.id,
        type    : 'survey'
    });
    
    apiData.get_DS();
    
    $scope.SURVEY_SUBMIT_PERSENTASE = 99;
    
    $rootScope.$watchGroup(['KELENGKAPAN_DATA','SURVEY_SUBMIT_PERSENTASE','DATA_STATUS_FOR_SUBMIT','DATA_SUB_STATUS_FOR_SUBMIT'],function(newValues, oldValues, scope){
        
        if (newValues){
            if (
                typeof($scope.KELENGKAPAN_DATA) != 'undefined' &&
                typeof($scope.SURVEY_SUBMIT_PERSENTASE) != 'undefined' &&
                typeof($rootScope.DATA_STATUS_FOR_SUBMIT) != 'undefined' &&
                typeof($rootScope.DATA_SUB_STATUS_FOR_SUBMIT) != 'undefined'
            ) {
				/*remark*/
                // if (($scope.KELENGKAPAN_DATA.PERCENTAGE.TOTAL > $scope.SURVEY_SUBMIT_PERSENTASE) && $rootScope.DATA_STATUS_FOR_SUBMIT == 1)
                    // $scope.SURVEY_SUBMITED = 1;
                // else if ($rootScope.DATA_STATUS_FOR_SUBMIT >= 2)
                    // $scope.SURVEY_SUBMITED = 2;
                // else
                    // $scope.SURVEY_SUBMITED = 3;	
                    
                $scope.SURVEY_LOCK = 'NO';
										
                /*FZL*/
                if ($rootScope.DATA_STATUS_FOR_SUBMIT == 3 && $rootScope.DATA_SUB_STATUS_FOR_SUBMIT == 3 ) {
                        $scope.SURVEY_SUBMITED = 8; //request dokumen
                        $scope.SURVEY_LOCK = 'YES';
                        $scope.SURVEY_UNLOCK_DOKUMEN = 'YES';
                } else if ($rootScope.DATA_STATUS_FOR_SUBMIT == 3 && $rootScope.DATA_SUB_STATUS_FOR_SUBMIT == 2 ) {
                        $scope.SURVEY_SUBMITED = 7; //kku lkku ulang
                        $scope.SURVEY_LOCK = 'YES';
                } else if ($rootScope.DATA_STATUS_FOR_SUBMIT == 3 && $rootScope.DATA_SUB_STATUS_FOR_SUBMIT == 0 ) {
                        $scope.SURVEY_SUBMITED = 6; //kku teruskan atau lkku ulang
                        $scope.SURVEY_LOCK = 'YES';
                } else if ($rootScope.DATA_STATUS_FOR_SUBMIT == 1 && $rootScope.DATA_SUB_STATUS_FOR_SUBMIT == 2 ) {
                        $scope.SURVEY_SUBMITED = 5; //kku approved / rejected
                } else if ($scope.KELENGKAPAN_DATA.PERCENTAGE.TOTAL > $scope.SURVEY_SUBMIT_PERSENTASE && $rootScope.DATA_STATUS_FOR_SUBMIT == 1 && $rootScope.DATA_SUB_STATUS_FOR_SUBMIT == 1 ) {
                        $scope.SURVEY_SUBMITED = 4; //aom submited
                        $scope.SURVEY_LOCK = 'YES';
                } else if ($scope.KELENGKAPAN_DATA.PERCENTAGE.TOTAL > $scope.SURVEY_SUBMIT_PERSENTASE && $rootScope.DATA_STATUS_FOR_SUBMIT == 1 && $rootScope.DATA_SUB_STATUS_FOR_SUBMIT == 0){
                        $scope.SURVEY_SUBMITED = 1; //show global submit button
                } else if ($rootScope.DATA_STATUS_FOR_SUBMIT >= 2){
                        $scope.SURVEY_SUBMITED = 2; // submit survey
                        $scope.SURVEY_LOCK = 'YES';
                } else {
                        $scope.SURVEY_SUBMITED = 3; //show percentage
                }

                console.log('SURVEY_SUBMITED = '+$scope.SURVEY_SUBMITED);
            }
        }
        
    });
    
    $scope.modalKRD = function(){
        
        var m = globalFunction.openModal('partials/modals/modal-survey-keterangan-request-dokumen.html','modal-survey-keterangan-request-dokumen modal-form','modalKeteranganRequestDocumentCtrl',$scope);

        $rootScope.closemodalKRD = function(){
            m.close();            
        };
        
    };
    
});

App.controller('modalKeteranganRequestDocumentCtrl',function($scope,apiData,apiBase,$stateParams){
    
    $scope.getlistKRD = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'review/get_requestdokumen/?id='+id,
            scope   : $scope,
            sn      : 'listKRD',
            type    : 'tolist'
        });
    };
    $scope.getlistKRD($stateParams.id);
    
});

/* List Survey */

App.controller('listSurveyCtrl',function($rootScope,$scope,apiData,apiBase,$stateParams){
    
    $scope.fdPL = {};
    $scope.listSL = [];
    $scope.fdPL.PAGE = 1;
    $scope.fdPL.MAX_SIZE = 5;
    $scope.fdPL.LIMIT = 10;
    
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
    
    $scope.getlistSL = function(d){
        var p = '';
        if (d['MS_WILAYAH_ID'])
            p +=   'MS_WILAYAH_ID='+d['MS_WILAYAH_ID'];
        if (d['MS_KODE_CABANG'])
            p +=   '&MS_KODE_CABANG='+d['MS_KODE_CABANG'];
        if (d['MS_KODE_UNIT'])
            p +=   '&MS_KODE_UNIT='+d['MS_KODE_UNIT'];
        if (d['PAGE'])
            p +=   '&PAGE='+d['PAGE'];
        if (d['LIMIT'])
            p +=   '&LIMIT='+d['LIMIT'];
        if (d['SEARCH'])
            p +=   '&SEARCH='+d['SEARCH'];
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_list/?'+p,
            scope   : $scope,
            sn      : 'listSL',
            type    : 'tolist',
            callbacksuccess : function(R){
//                $scope.fdPL.TOTAL_ITEMS = $scope.listSL.length;
                $scope.listSL_ = R.data.data;	
                $scope.fdPL.TOTAL_ITEMS = R.data.len;	
				
				/*FZL start*/
				$scope.tableRowExpanded = true;
				$scope.tableRowIndexCurrExpanded = "";
				$scope.tableRowIndexPrevExpanded = "";
				$scope.storeIdExpanded = "";
				$scope.DataCollapse = [false ,false ,false ,false ,false ,false ,false ,false ,false ,false];

				$scope.DataCollapseFn = function () {
					for (var i = 0; 10 - 1; i += 1) {						
						$scope.DataCollapse.append('true');
					}
				};

				$scope.selectTableRow = function (index, storeId) {
					
					console.log('selectTableRow',index,storeId);	
					if ($scope.DataCollapse === 'undefined') {						
						$scope.DataCollapse = $scope.DataCollapseFn();
					} else {
						console.log('$scope.tableRowExpanded=',$scope.tableRowExpanded)
						console.log('$scope.tableRowIndexCurrExpanded=',$scope.tableRowIndexCurrExpanded)
						console.log('$scope.storeIdExpanded=',$scope.storeIdExpanded);
						if ($scope.tableRowExpanded === false && $scope.tableRowIndexCurrExpanded === "" && $scope.storeIdExpanded === "") {
							console.log('masuk if 1');
							$scope.tableRowIndexPrevExpanded = "";
							$scope.tableRowExpanded = true;
							$scope.tableRowIndexCurrExpanded = index;
							$scope.storeIdExpanded = storeId;
							$scope.DataCollapse[index] = false;
						} else if ($scope.tableRowExpanded === true) {
							if ($scope.tableRowIndexCurrExpanded === index && $scope.storeIdExpanded === storeId) {
								console.log('masuk if 2');
								$scope.tableRowExpanded = true;
								$scope.tableRowIndexCurrExpanded = "";
								$scope.storeIdExpanded = "";
								$scope.DataCollapse[index] = false;
							} else {
								console.log('masuk if 3');
								$scope.tableRowIndexPrevExpanded = $scope.tableRowIndexCurrExpanded;
								$scope.tableRowIndexCurrExpanded = index;
								$scope.storeIdExpanded = storeId;
								$scope.DataCollapse[$scope.tableRowIndexPrevExpanded] = false;
								$scope.DataCollapse[$scope.tableRowIndexCurrExpanded] = true;
							}
						}
					}
				};
				/*FZL end*/
            }
        });
    };
//    $scope.getlistSL();
    
    $scope.$watchGroup(['fdPL.MS_WILAYAH_ID','fdPL.MS_KODE_CABANG','fdPL.MS_KODE_UNIT','fdPL.PAGE','fdPL.LIMIT','fdPL.SEARCH'], function(newValues, oldValues, scope) {
        if (newValues) {
            $scope.getlistSL({
                'MS_WILAYAH_ID'     : typeof ($scope.fdPL.MS_WILAYAH_ID)!='undefined' ? $scope.fdPL.MS_WILAYAH_ID : '',
                'MS_KODE_CABANG'    : typeof ($scope.fdPL.MS_KODE_CABANG)!='undefined' ? $scope.fdPL.MS_KODE_CABANG : '',
                'MS_KODE_UNIT'      : typeof ($scope.fdPL.MS_KODE_UNIT)!='undefined' ? $scope.fdPL.MS_KODE_UNIT : '',
                'PAGE'              : typeof ($scope.fdPL.PAGE)!='undefined' ? $scope.fdPL.PAGE : '',
                'LIMIT'             : typeof ($scope.fdPL.LIMIT)!='undefined' ? $scope.fdPL.LIMIT : '',
                'SEARCH'            : typeof ($scope.fdPL.SEARCH)!='undefined' ? $scope.fdPL.SEARCH : '',
            });
        }
    });
    
    $scope.pageChanged = function(p){
        $scope.fdPL.PAGE = p;
    };
	    
});

/* Informasi Survey */

App.controller('informasiSurveyCtrl',function($scope, apiData, apiBase,$stateParams,$rootScope,globalFunction){
    
    apiData.alamatExe($scope);
    
    $scope.fdIS = {};
    
    $scope.postIS = function(){
        $scope.fdIS.DB_PROSPEK_ID = $stateParams.id;
        apiData.post({
            gl      : true,
            api     : apiBase+'survey/post_alldata',
            data    : $scope.fdIS,
            scope   : $scope,
            callbacksuccess : function(){
                for (var k in $scope.fdIS){
                    if ($scope.DS.INFORMASI_SURVEY.INFORMASI_SURVEY_INDEX.hasOwnProperty(k)) {
                        $scope.DS.INFORMASI_SURVEY.INFORMASI_SURVEY_INDEX[k] = $scope.fdIS[k];
                    }
                }
            }
        });
    };
    
//    apiData.get_DS();
    
    $scope.$watch('DS', function(dataLoaded) {
        if (dataLoaded) {
            $scope.fdIS = $scope.DS.INFORMASI_SURVEY.INFORMASI_SURVEY_INDEX;
            $scope.fdISAOM = $scope.DS.INFORMASI_SURVEY.AOM;
        }
    });
    
})
.controller('informasiSurveyAlamatCtrl', function(modalService,$scope,apiData,apiBase,$stateParams,globalFunction,$rootScope){
    
    $scope.fdISAL = {};
    
    $scope.postISAL = function(){					
		if ($scope.formValid()){ /*FZL tambah validasi*/
				$scope.fdISAL.DB_PROSPEK_ID = $stateParams.id;
				apiData.post({
					gl      : true,
					api     : apiBase+'prospek/post_alamat',
					data    : $scope.fdISAL,
					scope   : $scope,
					type    : 'tolist',
					reload  : 'getlistISAL',
					fd      : 'fdISAL'
				});
		};
    };
	
	/*FZL tambah validasi*/
	$scope.formValid = function(){
        var e = globalFunction.formValidation({
            scope : $scope,
            form  : 'fdISAL',
            field : [
                { fn : 'MS_JENIS_ALAMAT_ID',  fk : 'Jenis Alamat' },
                { fn : 'PR_ALAMAT',  fk : 'Alamat' },
                { fn : 'PR_RT',  fk : 'RT' },
                { fn : 'MS_PROVINSI_ID',  fk : 'Provinsi' },
                { fn : 'MS_KODE_POS_ID',  fk : 'Kode Pos' },
                { fn : 'PR_LAMA_MENEMPATI',  fk : 'Lama Menempati (Bulan)' },
                { fn : 'MS_STATUS_TEMPAT_ID',  fk : 'Status Tempat' },
                { fn : 'PR_JARAK_ALAMAT',  fk : 'Jarak ke unit' }
            ]
        });
        return e;
    };
	
    
    $scope.getlistISAL = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'prospek/get_alamatlist/?id='+id,
            scope   : $scope,
            sn      : 'listISAL',
            type    : 'tolist'
        });
    };
    $scope.getlistISAL($stateParams.id);
    
    $scope.editISAL = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'prospek/get_alamatid/?id='+id,
            scope   : $scope,
            sn      : 'fdISAL',
            alamat  : true,
            callbacksuccess : function(R){	
					$scope.jenis_alamat_disable = (R.data[0].MS_JENIS_ALAMAT_ID==113) ? 'YES' : 'NO';							
                    $scope.fdISAL.PR_LAMA_MENEMPATI_TAHUN = Math.floor(parseInt(R.data[0].PR_LAMA_MENEMPATI) / 12);
                    $scope.fdISAL.PR_LAMA_MENEMPATI_BULAN = parseInt(R.data[0].PR_LAMA_MENEMPATI) % 12; 
                    
            }
        });
    };
    
    $scope.deleteISAL = function(d){
        
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Hapus',
            headerText: 'Hapus Alamat',
            bodyText: 'Apakah anda yakin menghapus alamat ini ?'
        }).then(function (result) {
            
            apiData.post({
                gl      : true,
                api     : apiBase+'prospek/delete_alamat',
                data    : d,
                scope   : $scope,
                type    : 'tolist',
                reload  : 'getlistISAL'
            });
            
        });
        
    };
    
    $scope.viewISAL = function(id){
        apiData.get_view({
            gl      : true,
            api     : apiBase+'prospek/get_alamatid/?id='+id,
            scope   : $scope,
            fd      : 'fdISAL',
            title   : 'View Informasi Survey - Alamat'
        });
        $scope.$watch('fdISAL',function(){
            $rootScope.ROW_VIEW = [
//                { k : 'Id', v : $scope.fdISAL.PR_INDIVIDU_ALAMAT_ID },
                { k : 'Jenis Alamat', v : $scope.fdISAL.MS_JENIS_ALAMAT },
                { k : 'Alamat', v : $scope.fdISAL.PR_ALAMAT },
                { k : 'RT', v : $scope.fdISAL.PR_RT },
                { k : 'RW', v : $scope.fdISAL.PR_RW },
                { k : 'Provinsi', v : $scope.fdISAL.MS_PROVINSI },
                { k : 'Kabupaten / Kota', v : $scope.fdISAL.MS_KABKOT },
                { k : 'Kecamatan', v : $scope.fdISAL.MS_KECAMATAN },
                { k : 'Kelurahan', v : $scope.fdISAL.MS_KELDES },
                { k : 'Kode Pos', v : $scope.fdISAL.MS_KODE_POS_ID },
                { k : 'Lama Menempati', v : $scope.fdISAL.PR_LAMA_MENEMPATI },
                { k : 'Status Tempat', v : $scope.fdISAL.MS_STATUS_TEMPAT },
                { k : 'Jarak ke unit', v : $scope.fdISAL.PR_JARAK_ALAMAT }
               
            ];
        });
    };
	
	/*FZL 11/12/2018 start*/
	$scope.setAlamatPriority = function(id){
		$scope.fdISAL.DB_PROSPEK_ID = $stateParams.id;
		$scope.fdISAL.PR_INDIVIDU_ALAMAT_ID = id;
		apiData.post({
			gl      : true,
			api     : apiBase+'prospek/post_alamatutama',
			data    : $scope.fdISAL,
			scope   : $scope,
			reload  : 'getlistISAL'
		});		
    };
	/*FZL 11/12/2018 stop*/	
    
    $scope.$watchGroup(['fdISAL.PR_LAMA_MENEMPATI_TAHUN','fdISAL.PR_LAMA_MENEMPATI_BULAN'],function(nV){
        if (nV){
            $scope.fdISAL.PR_LAMA_MENEMPATI = parseInt( $scope.fdISAL.PR_LAMA_MENEMPATI_TAHUN * 12 ) + parseInt($scope.fdISAL.PR_LAMA_MENEMPATI_BULAN);
        }
    });
    
})
.controller('informasiSurveyKunjunganUsahaCtrl', function(modalService,$rootScope,$scope,apiBase,apiData,$stateParams,globalFunction){
    
    $scope.fdISKU = {};
    
    $scope.postISKU = function(){	
		if ($scope.formValid()) { /*FZL penambahan if formvalid*/
			$scope.fdISKU.DB_PROSPEK_ID = $stateParams.id;
			apiData.post({
				gl      : true,
				api     : apiBase+'survey/post_kunjunganusaha',
				data    : $scope.fdISKU,
				scope   : $scope,
				type    : 'tolist',
				reload  : 'getlistISKU',
				fd      : 'fdISKU'
			});
		}
    };
    
    $scope.getlistISKU = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_kunjunganusahalist/?id='+id,
            scope   : $scope,
            sn      : 'listISKU',
            type    : 'tolist'
        });
    };
    $scope.getlistISKU($stateParams.id);
    
    $scope.editISKU = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'survey/get_kunjunganusahaid/?id='+id,
            scope   : $scope,
            sn      : 'fdISKU',
            setdate : [{ k : 'dtTSU', v : 'SV_TGL_SURVEY' }]
        });
    };
    
    $scope.deleteISKU = function(d){
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Hapus',
            headerText: 'Hapus Kunjungan Usaha',
            bodyText: 'Apakah anda yakin menghapus kunjungan usaha ini ?'
        }).then(function (result) {
            apiData.post({
                gl      : true,
                api     : apiBase+'survey/delete_kunjunganusaha',
                data    : d,
                scope   : $scope,
                type    : 'tolist',
                reload  : 'getlistISKU'
            });			
        });
    };
    
    $scope.viewISKU = function(id){
        apiData.get_view({
            gl      : true,
            api     : apiBase+'survey/get_kunjunganusahaid/?id='+id,
            scope   : $scope,
            fd      : 'fdISKU',
            title   : 'View Informasi Survey - Kunjungan Usaha'
        });
        $scope.$watch('fdISKU',function(){
            $rootScope.ROW_VIEW = [
//                { k : 'Id', v : $scope.fdISKU.SV_INDIVIDU_KUNJUNGAN_USAHA_ID },
                { k : 'Tanggal Survey Usaha', v : $scope.fdISKU.SV_TGL_SURVEY },
                { k : 'Lokasi yang dikunjungi ', v : $scope.fdISKU.MS_LOKASI_KUNJUNGAN_ID_DESKRIPSI },
                { k : 'Nama yang ditemui', v : $scope.fdISKU.SV_NAMA_DITEMUI },
                { k : 'Hubungan dengan pemohon', v : $scope.fdISKU.MS_HUBUNGAN_PEMOHON_ID_DESKRIPSI },
                { k : 'Keterangan', v : $scope.fdISKU.SV_KETERANGAN }
            ];
        });
    };
    
	
	/*FZL*/
	$scope.formValid = function(){
		var e = globalFunction.formValidation({
			scope : $scope,
			form  : 'fdISKU',
			field : [			
				{ fn : 'SV_TGL_SURVEY',  fk : 'Tanggal survey' },
				{ fn : 'MS_LOKASI_KUNJUNGAN_ID',  fk : 'Lokasi yang dikunjungi' },
				{ fn : 'SV_NAMA_DITEMUI',  fk : 'Nama yang ditemui' },						
				{ fn : 'MS_HUBUNGAN_PEMOHON_ID',  fk : 'Hubungan pemohon' },
				{ fn : 'SV_KETERANGAN',  fk : 'Keterangan' }
			]
		});
		return e;
	};				
	
	
});



/* Profile dan Karakter */

App.controller('profileDanKarakterSurveyCtrl',function($scope, apiData,apiBase,$stateParams,globalFunction,$rootScope){
    
    $scope.fdPDK = {};
    
    $scope.postPDK = function(){
		
		if ($scope.formValid()) { /*FZL penambahan if formvalid 10/4/2018*/
		
			$scope.fdPDK.DB_PROSPEK_ID = $stateParams.id;
	//        $scope.fdPDK.MS_MENGENAL_ULAMM_ID = globalFunction.cleanArray($scope.fdPDK.MS_MENGENAL_ULAMM_ID);
			apiData.post({
				gl      : true,
				api     : apiBase+'survey/post_alldata',
				data    : $scope.fdPDK,
				scope   : $scope,
				callbacksuccess : function(){
					for (var k in $scope.fdPDK){
						if ($scope.DS.PROFIL.PROFIL_INFO_PRIBADI.hasOwnProperty(k)) {
							$scope.DS.PROFIL.PROFIL_INFO_PRIBADI[k] = $scope.fdPDK[k];
						}
						if ($scope.DS.PROFIL.MS_EXSUM_CRITICAL.hasOwnProperty(k)) {
							$scope.DS.PROFIL.MS_EXSUM_CRITICAL[k] = $scope.fdPDK[k];
						}
					}
				}
			});
			
		}
    };

//    apiData.get_DS();
    
    $scope.$watch('DS', function(dataLoaded) {
        if (dataLoaded) {
            $scope.fdPDK = globalFunction.collectObject($scope.DS.PROFIL.PROFIL_INFO_PRIBADI,$scope.DS.PROFIL.MS_EXSUM_CRITICAL);
            $scope.fdPDK.MS_USIA = globalFunction.calculateAge($scope.DS.PROFIL.PROFIL_PROSPEK.PR_TGL_LAHIR);
            if (!$scope.fdPDK.MS_KEWARGANEGARAAN_ID)
                $scope.fdPDK.MS_KEWARGANEGARAAN_ID = $scope.DS.PROFIL.PROFIL_PROSPEK.MS_KEWARGANEGARAAN_ID;
            if (!$scope.fdPDK.MS_STATUS_PERKAWINAN_ID)
                $scope.fdPDK.MS_STATUS_PERKAWINAN_ID = $scope.DS.PROFIL.PROFIL_PROSPEK.MS_STATUS_KAWIN_ID;
            if (!$scope.fdPDK.MS_PENDIDIKAN_ID)
                $scope.fdPDK.MS_PENDIDIKAN_ID = $scope.DS.PROFIL.PROFIL_PROSPEK.MS_PENDIDIKAN_ID;
        }
    });		    	
	
    /*FZL 10/4/2018*/
    $scope.formValid = function(){			
	
		var e = true;
	
		console.log($rootScope.thisState);
    
		if ($rootScope.thisState == 'survey.profilekarakter.index'){
			e = globalFunction.formValidation({
					scope : $scope,
					form  : 'fdPDK',
					field : [
							{ fn : 'MS_PENDIDIKAN_ID',  fk : 'Pendidikan Terakhir' },
							{ fn : 'MS_STATUS_PERKAWINAN_ID',  fk : 'Status Perkawinan' },
							{ fn : 'MS_KERJASAMA_PEMOHON_ID',  fk : 'Kerja sama dari pemohon' },
							{ fn : 'MS_TRACK_RECORD_ID',  fk : 'Track Record Pinjaman' },
							{ fn : 'MS_REPUTASI_ID',  fk : 'Reputasi Pemohon' }																	
					]
			});		
		}	
		
		if ($rootScope.thisState == 'survey.profilekarakter.sumberinformasireputasi'){
			
			console.log('TOTAL ITEM',$scope.fdPDK.TOTAL_ITEMS);		
			if ($scope.fdPDK.TOTAL_ITEMS >= 3 ){
					$scope.fdPDK.TOTAL_ITEMS_SIR = 'ok';
			}else{
					$scope.fdPDK.TOTAL_ITEMS_SIR = null;
			}
			console.log('TOTAL ITEM SIR',$scope.fdPDK.TOTAL_ITEMS_SIR);
						
			e = globalFunction.formValidation({
                scope : $scope,
                form  : 'fdPDK',
                field : [												
						{ fn : 'TOTAL_ITEMS_SIR',  fk : 'Sumber Informasi Reputasi Kurang dari 3 ' }					
                ]
			});	
		}

		
        return e;
    };
    
//    $scope.$watch('DS.PROFIL.PROFIL_INFO_PRIBADI.MS_MENGENAL_ULAMM_ID',function(dataLoaded){
//        if (dataLoaded) {
//            apiData.get_masterData('global','MS_MENGENAL_ULAMM_ID');
//            var NA = [];
//            $scope.checkboxTrue = function(value,index){
//                
//                if ($scope.DS.PROFIL.PROFIL_INFO_PRIBADI.MS_MENGENAL_ULAMM_ID.indexOf(value) > -1) {
//                    $rootScope.MS_MENGENAL_ULAMM_ID[index]['CHECKED'] = value;
//                    NA[index] = value;
////                    return value;
//                } else {
//                     NA[index] = '';
////                    return false;
//                }
//                $scope.DS.PROFIL.PROFIL_INFO_PRIBADI.MS_MENGENAL_ULAMM_ID = NA;
//                console.log($rootScope.MS_MENGENAL_ULAMM_ID);
//            };
//            
////            $scope.$watch('fdPDK.MS_MENGENAL_ULAMM_ID',function(dataLoaded){});
//        }
//    });
    
})
.controller('pdkSumberInformasiReputasiCtrl', function(modalService,$scope, apiData,apiBase,$stateParams,$rootScope,globalFunction){
    
    $scope.fdPDKSIR = {};
//    $rootScope.fdPDKSIR = {};
    
    $scope.postPDKSIR = function(){
        if ($scope.formValid()){
            $scope.fdPDKSIR.DB_PROSPEK_ID = $stateParams.id;
            apiData.post({
                    gl      : true,
                    api     : apiBase+'survey/post_sumberinformasireputasi',
                    data    : $scope.fdPDKSIR,
                    scope   : $scope,
                    type    : 'tolist',
                    reload  : 'getlistPDKSIR',
                    fd      : 'fdPDKSIR'
            });
        };
    };	
	
    /*FZL*/
    $scope.formValid = function(){
        var e = globalFunction.formValidation({
            scope : $scope,
            form  : 'fdPDKSIR',
            field : [
                { fn : 'SV_NAMA',  fk : 'Nama' },
                { fn : 'MS_HUBUNGAN_PEMOHON_ID',  fk : 'Status Hubungan' },
                { fn : 'SV_NO_HP',  fk : 'Handphone' },
                { fn : 'MS_REPUTASI_ID',  fk : 'Penilaian Reputasi' }
            ]
        });
        return e;
    };
    
    $scope.getlistPDKSIR = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_sumberinformasireputasilist/?id='+id,
            scope   : $scope,
            sn      : 'listPDKSIR',
            type    : 'tolist',
            callbacksuccess : function(){ /*FZL penambahan count*/
                $scope.fdPDK.TOTAL_ITEMS = $scope.listPDKSIR.length;
//                console.log($rootScope.fdPDKSIR.TOTAL_ITEMS);
            }
        });
    };
    $scope.getlistPDKSIR($stateParams.id);
    
    $scope.editPDKSIR = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_sumberinformasireputasiid/?id='+id,
            scope   : $scope,
            sn      : 'fdPDKSIR'
        });
    };
    
    $scope.deletePDKSIR = function(d){
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Hapus',
            headerText: 'Hapus Sumber Informasi Usaha',
            bodyText: 'Apakah anda yakin menghapus sumber informasi usaha ini ?'
        }).then(function (result) {
            apiData.post({
                gl      : true,
                api     : apiBase+'survey/delete_sumberinformasireputasi',
                data    : d,
                scope   : $scope,
                type    : 'tolist',
                reload  : 'getlistPDKSIR'
            });
        });
        
    };
    
    $scope.viewPDKSIR = function(id){
        apiData.get_view({
            gl      : true,
            api     : apiBase+'survey/get_sumberinformasireputasiid/?id='+id,
            scope   : $scope,
            fd      : 'fdPDKSIR',
            title   : 'View Sumber Informasi Reputasi'
        });
        $scope.$watch('fdPDKSIR',function(){
            $rootScope.ROW_VIEW = [
//                { k : 'Id', v : $scope.fdPDKSIR.SV_INDIVIDU_REPUTASI_ID },
                { k : 'Nama', v : $scope.fdPDKSIR.SV_NAMA },
                { k : 'Status Hubungan', v : $scope.fdPDKSIR.MS_HUBUNGAN_PEMOHON_DESKRIPSI },
                { k : 'Handphone', v : $scope.fdPDKSIR.SV_NO_HP },
                { k : 'Penilaian Reputasi', v : $scope.fdPDKSIR.MS_REPUTASI_DESKRIPSI },
                { k : 'Keterangan', v : $scope.fdPDKSIR.SV_KETERANGAN }
            ];
        });
    };

    $scope.filterStatusHubungan = function (x) {
        return false || x.MS_PARA_GLOBAL_DETAIL_ID !== 121;
    };
    
})
.controller('pdkDokumenPembiayaanCtrl',function(modalService,$rootScope,$scope,apiData,apiBase,$stateParams,postDOC,globalFunction){
    
    $scope.fdPDKDP = {};
    
    $scope.$watchGroup(['DS','fdPDKDP.MS_JENIS_DOKUMEN_ID'],function(dataLoaded){
        if (dataLoaded){
            if ($scope.fdPDKDP.MS_JENIS_DOKUMEN_ID == 104 && $scope.DS.PROFIL.PROFIL_PROSPEK.MS_JENIS_IDENTITAS_ID == 1)
                $scope.fdPDKDP.PR_NOMOR_DOKUMEN = $scope.DS.PROFIL.PROFIL_PROSPEK.PR_NO_IDENTITAS;
        }
    });
       
    $scope.postPDKDP = function(){
        if ($scope.formValid()){
            $scope.fdPDKDP.DB_PROSPEK_ID = $stateParams.id;
            $scope.fdPDKDP.DB_HEADER = 'PEMBIAYAAN';
            $scope.fdPDKDP.DB_HEADER_ID = '';
            postDOC.e($scope.fdPDKDP,$scope,function(){
                $scope.fdPDKDP.PR_DOKUMEN = null;
            });
        }
    };
    
    $scope.getlistPDKDP = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_dokumenlist/?id='+id+'&header=PEMBIAYAAN',
            scope   : $scope,
            sn      : 'listPDKDP',
            type    : 'tolist'
        });
    };
    $scope.getlistPDKDP($stateParams.id);
    
    $scope.editPDKDP = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'prospek/get_dokumenid/?id='+id,
            scope   : $scope,
            sn      : 'fdPDKDP'
        });
    };
    
    $scope.deletePDKDP = function(d){
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Hapus',
            headerText: 'Hapus Dokumen Pembiayaan',
            bodyText: 'Apakah anda yakin menghapus dokumen pembiayaan ini ?'
        }).then(function (result) {
            apiData.post({
                gl      : true,
                api     : apiBase+'prospek/delete_dokumen',
                data    : d,
                scope   : $scope,
                type    : 'tolist',
                reload  : 'getlistPDKDP'
            });
        });
        
    };
    
    $scope.viewPDKDP = function(id){
        apiData.get_view({
            gl      : true,
            api     : apiBase+'prospek/get_dokumenid/?id='+id,
            scope   : $scope,
            fd      : 'fdPDKDP',
            title   : 'View Dokumen Pembiayaan'
        });
        $scope.$watch('fdPDKDP',function(){
            $rootScope.ROW_VIEW = [
//                { k : 'Id', v : $scope.fdPDKDP.PR_INDIVIDU_DOKUMEN_ID },
                { k : 'Jenis Dokumen', v : $scope.fdPDKDP.MS_JENIS_DOKUMEN },
                { k : 'Nomor Dokumen', v : $scope.fdPDKDP.PR_NOMOR_DOKUMEN },
                { k : 'File', v : $scope.fdPDKDP.NODE_ID, t : 'file', d : $scope.fdPDKDP.PR_PATH_DOKUMEN }
            ];
        });
    };
    
    $scope.formValid = function(){
        var e = globalFunction.formValidation({
            scope : $scope,
            form  : 'fdPDKDP',
            field : [
                { fn : 'PR_DOKUMEN',  fk : 'File dokumen' },
                { fn : 'MS_JENIS_DOKUMEN_ID',  fk : 'Jenis dokumen' },
                { fn : 'PR_NOMOR_DOKUMEN',  fk : 'Nomor dokumen' }
            ]
        });
        return e;
    };
    
});

/* Kapasitas Usaha */

App.controller('kapasitasUsahaSurveyCtrl', function($scope,apiBase,apiData,$stateParams,globalFunction){
    
    $scope.fdKU = {};
    
    $scope.postKU = function(){		
		if ($scope.formValid()){ /*FZL penambahan validasi*/		
			$scope.fdKU.DB_PROSPEK_ID = $stateParams.id;
			apiData.post({
				gl      : true,
				api     : apiBase+'survey/post_alldata',
				data    : $scope.fdKU,
				scope   : $scope,
				callbacksuccess : function(){
					for (var k in $scope.fdKU){
						if ($scope.DS.KAPASITAS_USAHA.KAPASITAS_USAHA_INDEX.hasOwnProperty(k)) {
							$scope.DS.KAPASITAS_USAHA.KAPASITAS_USAHA_INDEX[k] = $scope.fdKU[k];
						}
					}
				}
			});
		};
    };
    
	/*FZL 10/4/2018 */
	$scope.formValid = function(){
        var e = globalFunction.formValidation({
            scope : $scope,
            form  : 'fdKU',
            field : [
                { fn : 'MS_PEKERJAAN_ID',  fk : 'Pekerjaan' },
				{ fn : 'MS_LAMA_KERJA_DEBITUR',  fk : 'Lama Bekerja (bulan)' },
                { fn : 'MS_HARTA_ID',  fk : 'Harta Benda yang Dimiliki' }
            ]
        });
        return e;
    };	
	
//    apiData.get_DS();
    
    $scope.$watch('DS', function(dataLoaded) {
        if (dataLoaded) {
            $scope.fdKU = $scope.DS.KAPASITAS_USAHA.KAPASITAS_USAHA_INDEX;
            if (!$scope.fdKU.MS_PEKERJAAN_ID)
                $scope.fdKU.MS_PEKERJAAN_ID = $scope.DS.PROFIL.PROFIL_PROSPEK.MS_PEKERJAAN_ID;
        }
    });
    
})
.controller('kuAktifitasRekeningBankSurveyCtrl',function(modalService,$rootScope,$scope,apiData,apiBase,$stateParams,globalFunction){
    
    $scope.fdKUARB = {};
    
    $scope.postKUARB = function(){
        $scope.fdKUARB.DB_PROSPEK_ID = $stateParams.id;
        apiData.post({
            gl      : true,
            api     : apiBase+'survey/post_aktifitasrekeningbank',
            data    : $scope.fdKUARB,
            scope   : $scope,
            type    : 'tolist',
            reload  : 'getlistKUARB',
            fd      : 'fdKUARB'
        });
    };
    
    $scope.getlistKUARB = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_aktifitasrekeningbanklist/?id='+id,
            scope   : $scope,
            sn      : 'listKUARB',
            type    : 'tolist',
            callbacksuccess : function(R){
                $rootScope.AKTIFITAS_REKENING_BANK_BULAN_KE = [1,2,3];
                for(var i=0; i<R.data.length; i++){
                    var index = $rootScope.AKTIFITAS_REKENING_BANK_BULAN_KE.indexOf(R.data[i].SV_BULAN_KE);
//                    $rootScope.AKTIFITAS_REKENING_BANK_BULAN_KE.splice(index, 1); 
                    globalFunction.removeArray($rootScope.AKTIFITAS_REKENING_BANK_BULAN_KE,R.data[i].SV_BULAN_KE);
                }
            },
            callbackerror : function(){
                $scope.fdKUARB = {};
            }
        });
    };
    $scope.getlistKUARB($stateParams.id);    
    $scope.editKUARB = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'survey/get_aktifitasrekeningbankid/?id='+id,
            scope   : $scope,
            sn      : 'fdKUARB',
            callbacksuccess : function(){
                $rootScope.AKTIFITAS_REKENING_BANK_BULAN_KE = ['',1,2,3];
            }
        });
    };
    
    $scope.deleteKUARB = function(d){
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Hapus',
            headerText: 'Hapus Aktifitas Rekening',
            bodyText: 'Apakah anda yakin menghapus aktifitas rekening ini ?'
        }).then(function (result) {
            apiData.post({
                gl      : true,
                api     : apiBase+'survey/delete_aktifitasrekeningbank',
                data    : d,
                scope   : $scope,
                type    : 'tolist',
                reload  : 'getlistKUARB'
            });
        });
        
    };
    
    $scope.viewKUARB = function(id){
        apiData.get_view({
            gl      : true,
            api     : apiBase+'survey/get_aktifitasrekeningbankid/?id='+id,
            scope   : $scope,
            fd      : 'fdKUARB',
            title   : 'Aktifitas Rekening Bank'
        });
        $scope.$watch('fdKUARB',function(){
            $rootScope.ROW_VIEW = [
//                { k : 'Id', v : $scope.fdKUARB.SV_INDIVIDU_AKTIVITAS_REK_ID },
                { k : 'Bulan ke', v : $scope.fdKUARB.SV_BULAN_KE },
                { k : 'Bulan', v : $rootScope.bulan[$scope.fdKUARB.MS_BULAN_ID] },
                { k : 'Kredit Ribuan', v : $scope.fdKUARB.SV_KREDIT_RIBUAN, t : 'number' },
                { k : 'Freq', v : $scope.fdKUARB.SV_FREQ_KREDIT },
                { k : 'Debit Ribuan', v : $scope.fdKUARB.SV_DEBIT_RIBUAN , t : 'number' },
                { k : 'Freq', v : $scope.fdKUARB.SV_FREQ_DEBIT }
            ];
        });
    };
    
});

/* Jenis Usaha Survey */

App.controller('jenisUsahaSurveyCtrl',function(modalService, $scope, $rootScope, globalFunction, apiData, apiBase, $stateParams){
        
        $rootScope.listJUS = []; $scope.fdPL = {}; $scope.fdPL.MAX_SIZE = 5; $scope.fdPL.LIMIT = 10;
        
        $scope.modalJUS = function(){

            var m = globalFunction.openModal('partials/modals/modal-survey-jenis-usaha.html','modal-form modal-survey-jenis-usaha', 'modalAddJenisUsahaCtrl');
            
            $rootScope.closemodalJUS = function() { m.close(); };
            
        };

        $rootScope.getlistJUS = function(id){
            apiData.get({
                gl      : false,
                api     : apiBase+'survey/get_jenisusahalist/?id='+id,
                scope   : $rootScope,
                sn      : 'listJUS',
                type    : 'tolist',
                callbacksuccess : function(){
                    $scope.fdPL.TOTAL_ITEMS = $scope.listJUS.length;					
//                    if (typeof $rootScope.fdJUS.PR_LAMA_MENEMPATI === 'undefined') {
//                        $rootScope.fdJUS.PR_LAMA_MENEMPATI = 0;	
//                    }									
                }
            });
        };
        $scope.getlistJUS($stateParams.id);

        $scope.editJUS = function(id){
            apiData.get({
                gl      : true,
                api     : apiBase+'survey/get_jenisusahaid/?id='+id,
                scope   : $rootScope,
                sn      : 'fdJUS',
                alamat  : true,
                callbacksuccess : function(){
                    $rootScope.fdJUS.SV_SURAT_KETERANGAN_USAHA_ID = $rootScope.fdJUS.SV_SURAT_KETERANGAN_USAHA;
                    $rootScope.fdJUS.PR_LAMA_MENEMPATI_TAHUN = Math.floor($rootScope.fdJUS.PR_LAMA_MENEMPATI / 12);
                    $rootScope.fdJUS.PR_LAMA_MENEMPATI_BULAN = $rootScope.fdJUS.PR_LAMA_MENEMPATI % 12; 
                    $rootScope.fdJUS.PR_LAMA_USAHA_TAHUN = Math.floor($rootScope.fdJUS.PR_LAMA_USAHA / 12);
                    $rootScope.fdJUS.PR_LAMA_USAHA_BULAN = $rootScope.fdJUS.PR_LAMA_USAHA % 12; 
                }
            });
            $scope.modalJUS();
        };

        $scope.deleteJUS = function(d){
            modalService.showModal({}, {
                closeButtonText: 'Batal',
                actionButtonText: 'Hapus',
                headerText: 'Hapus Jenis Usaha',
                bodyText: 'Apakah anda yakin menghapus jenis usaha ini ?'
            }).then(function (result) {
                apiData.post({
                    gl      : true,
                    api     : apiBase+'survey/delete_jenisusaha',
                    data    : d,
                    scope   : $scope,
                    type    : 'tolist',
                    reload  : 'getlistJUS'
                });
            });
        };
        
        $scope.postJUSUtama = function(id){						
			$scope.fdJUS = {};
			$scope.fdJUS.DB_PROSPEK_ID = $stateParams.id;
			$scope.fdJUS.PR_INDIVIDU_USAHA_ID = id;
			apiData.post({
				gl      : false,
				api     : apiBase+'survey/post_jenisusahautama',
				data    : $scope.fdJUS,
				scope   : $scope,
				type    : 'tolist',
				reload  : 'getlistJUS',
				fd      : 'fdJUS'
			});
        };				
        
        $scope.viewJUS = function(id){
            apiData.get_view({
                gl      : true,
                api     : apiBase+'survey/get_jenisusahaid/?id='+id,
                scope   : $scope,
                fd      : 'fdJUS',
                title   : 'Jenis Usaha'
            });
            $scope.$watch('fdJUS',function(){
                $rootScope.ROW_VIEW = [
//                    { k : 'Id', v : $scope.fdJUS.PR_INDIVIDU_USAHA_ID },
                    { k : 'Bentuk Usaha', v : $scope.fdJUS.MS_BENTUK_USAHA_ID_DESKRIPSI },
                    { k : 'Jenis Badan Usaha', v : $scope.fdJUS.MS_JENIS_BADAN_USAHA_ID_DESKRIPSI },
                    { k : 'Jenis Usaha', v : $scope.fdJUS.MS_JENIS_USAHA_ID_DESKRIPSI },
                    { k : 'Nama Usaha', v : $scope.fdJUS.PR_NAMA_USAHA },
                    { k : 'Jumlah Karyawan', v : $scope.fdJUS.PR_JUMLAH_KARYAWAN },
                    { k : 'Jenis product yang ditawarkan', v : $scope.fdJUS.MS_PRODUK_DITAWARKAN_ID_DESKRIPSI },
                    { k : 'Keterangan Produk', v : $scope.fdJUS.SV_KETERANGAN_PRODUK },
                    { k : 'Lama Usaha', v : $scope.fdJUS.PR_LAMA_USAHA, l : 'bulan' },
                    { k : 'Omset Perhari*', v : $scope.fdJUS.PR_OMSET_HARIAN, t : 'number' },
                    { k : 'Telepon', v : $scope.fdJUS.PR_NO_TELP_USAHA },
                    
                    { k : 'Alamat', v : $scope.fdJUS.PR_ALAMAT },
                    { k : 'RT', v : $scope.fdJUS.PR_RT },
                    { k : 'RW', v : $scope.fdJUS.PR_RW },
                    { k : 'Provinsi', v : $scope.fdJUS.MS_PROVINSI_ID_DESKRIPSI },
                    { k : 'Kabupaten / Kota', v : $scope.fdJUS.MS_KABKOT_ID_DESKRIPSI },
                    { k : 'Kecamatan', v : $scope.fdJUS.MS_KECAMATAN_ID_DESKRIPSI },
                    { k : 'Kelurahan', v : $scope.fdJUS.MS_KELDES_ID_DESKRIPSI },
                    { k : 'Kode Pos', v : $scope.fdJUS.MS_KODE_POS_ID },
                    { k : 'Lama Menempati', v : $scope.fdJUS.PR_LAMA_MENEMPATI, l : 'bulan' },
                    { k : 'Status Tempat', v : $scope.fdJUS.MS_STATUS_TEMPAT_ID_DESKRIPSI },
                    { k : 'Jarak lokasi usaha dengan kantor ULaMM', v : $scope.fdJUS.SV_JARAK_USAHA_DENGAN_ULAMM, l : 'KM' },
                    
                    { k : 'Kegiatan ditempat usaha', v : $scope.fdJUS.MS_KEGIATAN_USAHA_ID_DESKRIPSI },
                    { k : 'Kondisi Tempat Usaha*', v : $scope.fdJUS.MS_KONDISI_TEMPAT_USAHA_ID_DESKRIPSI },
                    { k : 'Akses Kendaraan', v : $scope.fdJUS.MS_AKSES_KENDARAAN_ID_DESKRIPSI },
                    { k : 'Memiliki Surat Keterangan Usaha / Bekerja', v : $scope.fdJUS.SV_SURAT_KETERANGAN_USAHA, t : 'yesorno', tv : 1 },
                    { k : 'Ketersediaan Bahan Baku', v : $scope.fdJUS.MS_KETERSEDIAAN_BAHAN_BAKU_ID_DESKRIPSI },
                    { k : 'Jumlah Pemasok Barang', v : $scope.fdJUS.MS_JML_PEMASOK_ID_DESKRIPSI },
                    { k : 'Persaingan Usaha', v : $scope.fdJUS.MS_PERSAINGAN_USAHA_ID_DESKRIPSI },
                    { k : 'Daftar Negatif List Industri', v : $scope.fdJUS.SV_DAFTAR_NEGATIF, t : 'yesorno', tv : 1 },
                    { k : 'Daftar Negatif List Industri Keterangan', v : $scope.fdJUS.SV_DAFTAR_NEGATIF_DESKRIPSI },
                    { k : 'Gambaran kondisi sektor usaha calon debitur saat ini di wilayah tersebut', v : $scope.fdJUS.MS_KONDISI_SEKTOR_USAHA_ID_DESKRIPSI },
                    { k : 'Pangsa Pasar', v : $scope.fdJUS.SV_PANGSA_PASAR },
                    { k : 'Lokasi Usaha', v : $scope.fdJUS.MS_LOKASI_USAHA_ID_DESKRIPSI },
                    { k : 'Periode Penjualan', v : $scope.fdJUS.MS_PERIODE_PENJUALAN_ID_DESKRIPSI },
                    { k : 'Pola Pembayaran Costumer', v : $scope.fdJUS.MS_POLA_PEMBAYARAN_ID_DESKRIPSI },
                    { k : 'Pola Pembelian Bahan Baku', v : $scope.fdJUS.MS_POLA_PEMBELIAN_ID_DESKRIPSI },
                    { k : 'Pola Pembayaran Pada Supplier', v : $scope.fdJUS.MS_POLA_PEMBAYARAN_SUPPLIER_ID_DESKRIPSI },
                    
                ];
            });
        };
		
//		$scope.$watchGroup(['fdJUS.PR_LAMA_MENEMPATI_TAHUN','fdJUS.PR_LAMA_MENEMPATI_BULAN'],function(nV){
//            if (nV){
//                $scope.fdJUS.PR_LAMA_MENEMPATI = parseInt( $scope.fdJUS.PR_LAMA_MENEMPATI_TAHUN * 12 ) + parseInt($scope.fdJUS.PR_LAMA_MENEMPATI_BULAN);
//            }
//        });
//		
//		$scope.$watchGroup(['fdJUS.PR_LAMA_USAHA_TAHUN','fdJUS.PR_LAMA_USAHA_BULAN'],function(nV){
//            if (nV){
//                $scope.fdJUS.PR_LAMA_USAHA = parseInt( $scope.fdJUS.PR_LAMA_USAHA_TAHUN * 12 ) + parseInt($scope.fdJUS.PR_LAMA_USAHA_BULAN);
//            }
//        });
				      
    })
    
    .controller('modalAddJenisUsahaCtrl', function($scope,$rootScope,apiData,apiBase,$stateParams,globalFunction){
        
        if ($rootScope.fdJUS == undefined)
            $rootScope.fdJUS = {};
        
        apiData.alamatExe($scope);
        
        $scope.tabChange = function(t){
            $scope.tab = t;
        };
    
        $scope.postJUS = function(){
			if ($scope.formValid()){	/*FZL penambahan validasi*/
				$rootScope.fdJUS.DB_PROSPEK_ID = $stateParams.id;
				$rootScope.fdJUS.MS_JENIS_ALAMAT_ID = '113'; //Tempat Usaha
				apiData.post({
					gl      : true,
					api     : apiBase+'survey/post_jenisusaha',
					data    : $rootScope.fdJUS,
					scope   : $scope,
					type    : 'tolist',
					reload  : 'getlistJUS',
					ag      : 'on-modal',
					cm      : 'closemodalJUS'
				});
			};
        };
		
		/*FZL 10/4/2018*/
		$scope.formValid = function(){						
			var e = globalFunction.formValidation({
				scope : $scope,
				form  : 'fdJUS',
				field : [
					{ fn : 'MS_BENTUK_USAHA_ID',  fk : 'Bentuk Usaha' },
					{ fn : 'PR_JUMLAH_KARYAWAN',  fk : 'Jumlah Karyawan' },
					{ fn : 'PR_LAMA_USAHA',  fk : 'Lama Usaha' },
					{ fn : 'PR_OMSET_HARIAN',  fk : 'Omset Perhari' },
					{ fn : 'PR_LAMA_MENEMPATI',  fk : 'Lama Menempati' },
					{ fn : 'MS_STATUS_TEMPAT_ID',  fk : 'Status Tempat' },
					{ fn : 'SV_JARAK_USAHA_DENGAN_ULAMM',  fk : 'Jarak lokasi usaha dengan kantor ULaMM' },
					{ fn : 'MS_KEGIATAN_USAHA_ID',  fk : 'Kegiatan ditempat usaha' },
					{ fn : 'MS_KONDISI_TEMPAT_USAHA_ID',  fk : 'Kondisi Tempat Usaha' },
					{ fn : 'MS_AKSES_KENDARAAN_ID',  fk : 'Akses Kendaraan' },
					{ fn : 'SV_SURAT_KETERANGAN_USAHA_ID',  fk : 'Memiliki Surat Keterangan Usaha / Bekerja' },
					{ fn : 'MS_KETERSEDIAAN_BAHAN_BAKU_ID',  fk : 'Ketersediaan Bahan Baku' },
					{ fn : 'MS_JML_PEMASOK_ID',  fk : 'Jumlah Pemasok Barang' },
					{ fn : 'MS_PERSAINGAN_USAHA_ID',  fk : 'Persaingan Usaha' },
					{ fn : 'SV_DAFTAR_NEGATIF',  fk : 'Daftar Negatif List Industri' },
					{ fn : 'MS_KONDISI_SEKTOR_USAHA_ID',  fk : 'Gambaran kondisi sektor usaha' },
					{ fn : 'MS_PERIODE_PENJUALAN_ID',  fk : 'Periode Penjualan' },
					{ fn : 'MS_POLA_PEMBAYARAN_ID',  fk : 'Pola Pembayaran Costumer' },
					{ fn : 'MS_POLA_PEMBELIAN_ID',  fk : 'Pola Pembelian Bahan Baku' },
					{ fn : 'MS_POLA_PEMBAYARAN_SUPPLIER_ID',  fk : 'Pola Pembayaran Pada Supplier' },
					
					{ fn : 'SV_PEMBUKUAN_TRANSAKSI',  fk : 'pembukuan traksaksi usaha' },
					{ fn : 'SV_PEMISAHAN_PEMBUKUAN',  fk : 'pemisahan pembukuan' },
					{ fn : 'SV_TANGGAL_TRANSAKSI',  fk : 'tanggal transaksi' },
					{ fn : 'SV_CATATAN_PENERIMAAN',  fk : 'catatan penerimaan' },
					{ fn : 'SV_CATATAN_PENGELUARAN',  fk : 'catatan pengeluaran' },
					{ fn : 'SV_CATATAN_PIUTANG_HUTANG',  fk : 'catatan piutang dan hutang' },
					{ fn : 'SV_CATATAN_PERSEDIAAN',  fk : 'catatan persediaan' },
					{ fn : 'SV_CATATAN_LABA_RUGI',  fk : 'catatan laba/rugi' }
				]
			});
			return e;
		};
        
        $scope.yonPLK = function(){
            if ($scope.fdJUS.MS_PENGELOLAAN_KEUANGAN_ID == '156') {
                
                // 1. Pembukuan usaha sudah terpisah dari pengeluaran pribadi & terdapat pencatatan : Tanggal transaksi, Persediaan Barang, Penerimaan & Pengeluaran Tunai, Keuntungan / Kerugian, Piutang & Hutang
                $scope.fdJUS.SV_PEMBUKUAN_TRANSAKSI = 1;
                $scope.fdJUS.SV_PEMISAHAN_PEMBUKUAN = 1;
                $scope.fdJUS.SV_TANGGAL_TRANSAKSI = 1;
                $scope.fdJUS.SV_CATATAN_PENERIMAAN = 1;
                $scope.fdJUS.SV_CATATAN_PENGELUARAN = 1;
                $scope.fdJUS.SV_CATATAN_PIUTANG_HUTANG = 1;
                $scope.fdJUS.SV_CATATAN_PERSEDIAAN = 1;
                $scope.fdJUS.SV_CATATAN_LABA_RUGI = 1;
                
            } else if ($scope.fdJUS.MS_PENGELOLAAN_KEUANGAN_ID == '157'){
                
                // 2. Pembukuan usaha sudah terpisah dari pengeluaran pribadi & terdapat pencatatan : Tanggal transaksi, Persediaan Barang, Penerimaan & Pengeluaran Tunai, Piutang & Hutang
                $scope.fdJUS.SV_PEMBUKUAN_TRANSAKSI = 1;
                $scope.fdJUS.SV_PEMISAHAN_PEMBUKUAN = 1;
                $scope.fdJUS.SV_TANGGAL_TRANSAKSI = 1;
                $scope.fdJUS.SV_CATATAN_PENERIMAAN = 1;
                $scope.fdJUS.SV_CATATAN_PENGELUARAN = 1;
                $scope.fdJUS.SV_CATATAN_PIUTANG_HUTANG = 1;
                $scope.fdJUS.SV_CATATAN_PERSEDIAAN = 1;
                $scope.fdJUS.SV_CATATAN_LABA_RUGI = 0;
                
            } else if ($scope.fdJUS.MS_PENGELOLAAN_KEUANGAN_ID == '158'){
                
                // 3. Pembukuan usaha sudah terpisah dari pengeluaran pribadi, namun pencatatan tidak selengkap kriteria diatas (Pembukuan sudah baik)
                $scope.fdJUS.SV_PEMBUKUAN_TRANSAKSI = 1;
                $scope.fdJUS.SV_PEMISAHAN_PEMBUKUAN = 1;
                $scope.fdJUS.SV_TANGGAL_TRANSAKSI = null;
                $scope.fdJUS.SV_CATATAN_PENERIMAAN = null;
                $scope.fdJUS.SV_CATATAN_PENGELUARAN = null;
                $scope.fdJUS.SV_CATATAN_PIUTANG_HUTANG = null;
                $scope.fdJUS.SV_CATATAN_PERSEDIAAN = null;
                $scope.fdJUS.SV_CATATAN_LABA_RUGI = null;
                
            } else if ($scope.fdJUS.MS_PENGELOLAAN_KEUANGAN_ID == '159'){
                
                // 4. Pembukuan usaha masih bercampur dengan pengeluaran pribadi & terdapat pencatatan minimal : Tanggal transaksi, Persediaan Barang, Penerimaan & Pengeluaran Tunai, Piutang & Hutang (Pembukuan sudah cukup baik)
                $scope.fdJUS.SV_PEMBUKUAN_TRANSAKSI = 1;
                $scope.fdJUS.SV_PEMISAHAN_PEMBUKUAN = 0;
                $scope.fdJUS.SV_TANGGAL_TRANSAKSI = 1;
                $scope.fdJUS.SV_CATATAN_PENERIMAAN = 1;
                $scope.fdJUS.SV_CATATAN_PENGELUARAN = 1;
                $scope.fdJUS.SV_CATATAN_PIUTANG_HUTANG = 1;
                $scope.fdJUS.SV_CATATAN_PERSEDIAAN = 1;
                $scope.fdJUS.SV_CATATAN_LABA_RUGI = 0;
                
            } else if ($scope.fdJUS.MS_PENGELOLAAN_KEUANGAN_ID == '160'){
                
                // 5. Pembukuan usaha masih bercampur dengan pengeluaran pribadi & terdapat pencatatan minimal : tanggal transaksi, penerimaan & pengeluaran, hutang & piutang (Pembukuan sudah cukup baik)
                $scope.fdJUS.SV_PEMBUKUAN_TRANSAKSI = 1;
                $scope.fdJUS.SV_PEMISAHAN_PEMBUKUAN = 0;
                $scope.fdJUS.SV_TANGGAL_TRANSAKSI = 1;
                $scope.fdJUS.SV_CATATAN_PENERIMAAN = 1;
                $scope.fdJUS.SV_CATATAN_PENGELUARAN = 1;
                $scope.fdJUS.SV_CATATAN_PIUTANG_HUTANG = 1;
                $scope.fdJUS.SV_CATATAN_PERSEDIAAN = 0;
                $scope.fdJUS.SV_CATATAN_LABA_RUGI = 0;
                
            } else if ($scope.fdJUS.MS_PENGELOLAAN_KEUANGAN_ID == '161'){
                
                // 6. Pembukuan usaha masih bercampur dengan pengeluaran pribadi & terdapat pencatatan minimal : tanggal transaksi, penerimaan, hutang & piutang (Pembukuan sudah cukup baik)
                $scope.fdJUS.SV_PEMBUKUAN_TRANSAKSI = 1;
                $scope.fdJUS.SV_PEMISAHAN_PEMBUKUAN = 0;
                $scope.fdJUS.SV_TANGGAL_TRANSAKSI = 1;
                $scope.fdJUS.SV_CATATAN_PENERIMAAN = 1;
                $scope.fdJUS.SV_CATATAN_PENGELUARAN = 0;
                $scope.fdJUS.SV_CATATAN_PIUTANG_HUTANG = 1;
                $scope.fdJUS.SV_CATATAN_PERSEDIAAN = 0;
                $scope.fdJUS.SV_CATATAN_LABA_RUGI = 0;
                
            } else if ($scope.fdJUS.MS_PENGELOLAAN_KEUANGAN_ID == '162'){
                
                // 7. Pembukuan usaha masih bercampur dengan pengeluaran pribadi & pencatatan sangat sederhana tidak selengkap kriteria diatas (Pembukuan sudah cukup baik)
                $scope.fdJUS.SV_PEMBUKUAN_TRANSAKSI = 1;
                $scope.fdJUS.SV_PEMISAHAN_PEMBUKUAN = 0;
                $scope.fdJUS.SV_TANGGAL_TRANSAKSI = null;
                $scope.fdJUS.SV_CATATAN_PENERIMAAN = null;
                $scope.fdJUS.SV_CATATAN_PENGELUARAN = null;
                $scope.fdJUS.SV_CATATAN_PIUTANG_HUTANG = null;
                $scope.fdJUS.SV_CATATAN_PERSEDIAAN = null;
                $scope.fdJUS.SV_CATATAN_LABA_RUGI = null;
                
            } else if ($scope.fdJUS.MS_PENGELOLAAN_KEUANGAN_ID == '472'){
                
                // 8. Tidak ada pembukuan
                $scope.fdJUS.SV_PEMBUKUAN_TRANSAKSI = 0;
                $scope.fdJUS.SV_PEMISAHAN_PEMBUKUAN = 0;
                $scope.fdJUS.SV_TANGGAL_TRANSAKSI = 0;
                $scope.fdJUS.SV_CATATAN_PENERIMAAN = 0;
                $scope.fdJUS.SV_CATATAN_PENGELUARAN = 0;
                $scope.fdJUS.SV_CATATAN_PIUTANG_HUTANG = 0;
                $scope.fdJUS.SV_CATATAN_PERSEDIAAN = 0;
                $scope.fdJUS.SV_CATATAN_LABA_RUGI = 0;
                
            } else {
                
                console.log('No data');
                
            }
        };
        
        $scope.$watch('fdJUS.MS_PENGELOLAAN_KEUANGAN_ID',function(dataLoaded){
            if (dataLoaded) {
//                $scope.yonPLK();
            }
        });
        
//        $rootScope.$watchGroup(['fdJUS.SV_PEMBUKUAN_TRANSAKSI'],function(nV){
//            if (nV){
                $scope.changePembukuanTransaksi = function(A){
//                    if (typeof $rootScope.fdJUS.SV_PEMBUKUAN_TRANSAKSI == 0){
                    if (A == 0){
                            $rootScope.fdJUS.SV_PEMISAHAN_PEMBUKUAN = 0;
                            $rootScope.fdJUS.SV_TANGGAL_TRANSAKSI = 0;
                            $rootScope.fdJUS.SV_CATATAN_PENERIMAAN = 0;
                            $rootScope.fdJUS.SV_CATATAN_PENGELUARAN = 0;
                            $rootScope.fdJUS.SV_CATATAN_PIUTANG_HUTANG = 0;
                            $rootScope.fdJUS.SV_CATATAN_PERSEDIAAN = 0;
                            $rootScope.fdJUS.SV_CATATAN_LABA_RUGI = 0;
                        } else {
                            $rootScope.fdJUS.SV_PEMISAHAN_PEMBUKUAN = null;
                            $rootScope.fdJUS.SV_TANGGAL_TRANSAKSI = null;
                            $rootScope.fdJUS.SV_CATATAN_PENERIMAAN = null;
                            $rootScope.fdJUS.SV_CATATAN_PENGELUARAN = null;
                            $rootScope.fdJUS.SV_CATATAN_PIUTANG_HUTANG = null;
                            $rootScope.fdJUS.SV_CATATAN_PERSEDIAAN = null;
                            $rootScope.fdJUS.SV_CATATAN_LABA_RUGI = null;
                        }
                };
//            }
//        });
		
        $rootScope.$watchGroup(['fdJUS.PR_LAMA_MENEMPATI_TAHUN','fdJUS.PR_LAMA_MENEMPATI_BULAN'],function(nV){
            if (nV){
                $scope.fdJUS.PR_LAMA_MENEMPATI = parseInt( $scope.fdJUS.PR_LAMA_MENEMPATI_TAHUN * 12 ) + parseInt($scope.fdJUS.PR_LAMA_MENEMPATI_BULAN);
            }
        });
        
        $rootScope.$watchGroup(['fdJUS.PR_LAMA_USAHA_TAHUN','fdJUS.PR_LAMA_USAHA_BULAN'],function(nV){
            if (nV){
                $scope.fdJUS.PR_LAMA_USAHA = parseInt( $scope.fdJUS.PR_LAMA_USAHA_TAHUN * 12 ) + parseInt($scope.fdJUS.PR_LAMA_USAHA_BULAN);
            }
        });
    });
    
/* Keuangan Survey */

App.controller('keuanganSurveyCtrl', function($scope,$rootScope,globalFunction,apiData,apiBase,globalFunction,$stateParams,$state){
    
    $scope.fdKS = {};
    
    $scope.postKS = function(){		
		if ($scope.formValid()){ /*FZL penambahan validasi*/
			$scope.fdKS.DB_PROSPEK_ID = $stateParams.id;
			$scope.fdKS.MS_RENCANA_PRODUK_ID = $scope.fdKS.MS_PRODUK_ID; /*FZL*/
			$scope.fdKS.MS_RENCANA_PRODUK_ID_DESKRIPSI = $scope.fdKS.MS_PRODUK_ID_DESKRIPSI; /*FZL*/
			apiData.post({
				gl      : true,
				api     : apiBase+'survey/post_alldata',
				data    : $scope.fdKS,
				scope   : $scope,
				type    : 'tolist',
				callbacksuccess : function(){
					for (var k in $scope.fdKS){
						if ($scope.DS.KEUANGAN.KEUANGAN_INDEX.hasOwnProperty(k)) {
							$scope.DS.KEUANGAN.KEUANGAN_INDEX[k] = $scope.fdKS[k];
						}
						if ($scope.DS.KEUANGAN.KEUANGAN_DATA_PINJAMAN.hasOwnProperty(k)) {
							$scope.DS.KEUANGAN.KEUANGAN_DATA_PINJAMAN[k] = $scope.fdKS[k];
						}
					}
				}
			});
		};
    };
	
	
	/*FZL 10/4/2018*/
	$scope.formValid = function(){
		
		// console.log($scope.fdKS);
        var e = globalFunction.formValidation({
            scope : $scope,
            form  : 'fdKS',
            field : [
                { fn : 'MS_OMSET_PERBULAN',  fk : 'Omset Per Bulan' },
                { fn : 'MS_HARGA_POKOK_PENJUALAN',  fk : 'Harga Pokok Penjualan / Produksi' },
                { fn : 'MS_BIAYA_TENAGA_KERJA',  fk : 'Biaya Tenaga Kerja' },
                { fn : 'MS_SEWA_TEMPAT_USAHA_PERBULAN',  fk : 'Sewa Tempat Usaha' },
                { fn : 'MS_SEWA_LAINNYA',  fk : 'Sewa lainnya' },
                { fn : 'MS_BIAYA_LISTRIK_PERBULAN',  fk : 'Biaya listrik, telpon, air untuk usaha' },
                { fn : 'MS_BIAYA_LAINNYA_PERBULAN',  fk : 'Biaya lainnya untuk usaha tsb' },
                { fn : 'MS_PENGHASILAN_USAHA_LAIN_1',  fk : 'Penghasilan bersih usaha lain 1' },
                { fn : 'MS_PENGHASILAN_USAHA_LAIN_2',  fk : 'Penghasilan bersih usaha lain 2' },
                { fn : 'MS_GAJI_DEBITUR_PERBULAN',  fk : 'Gaji debitur' },
                { fn : 'MS_GAJI_PASANGAN_PERBULAN',  fk : 'Gaji pasangan' },
                { fn : 'MS_BIAYA_RUMAH_TANGGA_PASANGAN_PERBULAN',  fk : 'Biaya Rumah Tangga Pasangan' },
                { fn : 'MS_BIAYA_RUMAH_TANGGA_ANAK_PERBULAN',  fk : 'Biaya Rumah Tangga Anak' },
                { fn : 'MS_BIAYA_RUMAH_TANGGA_LAINNYA_PERBULAN',  fk : 'Biaya Rumah tangga Tanggungan Lainnya' },
                { fn : 'MS_PRODUK_ID',  fk : 'Produk' },
                { fn : 'MS_TENOR',  fk : 'Tenor' },
                { fn : 'MS_PLAFOND',  fk : 'Plafond' },
                { fn : 'MS_PROGRAM_ID',  fk : 'Program' },
                { fn : 'MS_BUNGA_PERBULAN',  fk : 'Bunga' },
                { fn : 'MS_TUJUAN_PEMBIAYAAN_ID',  fk : 'Tujuan Pembiayaan' }
            ]
        });
        return e;
    };
    
//    apiData.get_DS();
    
    $scope.$watch('DS', function(dataLoaded) {
        if (dataLoaded) {
            $scope.fdKS = globalFunction.collectObject($scope.DS.KEUANGAN.KEUANGAN_INDEX,$scope.DS.KEUANGAN.KEUANGAN_DATA_PINJAMAN,$scope.DS.INFORMASI_SURVEY.INFORMASI_SURVEY_INDEX,$scope.DS.PROFIL.PROFIL_PROSPEK);
            $scope.JPem = globalFunction.collectObject($scope.DS.INFORMASI_SURVEY.INFORMASI_SURVEY_INDEX);
            
            if (!$scope.fdKS.MS_PRODUK_ID)
                $scope.fdKS.MS_PRODUK_ID = $scope.fdKS.MS_RENCANA_PRODUK_ID;
            if (!$scope.fdKS.MS_TENOR)
                $scope.fdKS.MS_TENOR = $scope.fdKS.MS_RENCANA_TENOR;
            if (!$scope.fdKS.MS_PLAFOND)
                $scope.fdKS.MS_PLAFOND = $scope.fdKS.MS_RENCANA_PLAFOND;
            
//            if ($scope.fdKS.MS_PRODUK_ID)
//                apiData.getProdukDetail({id : $scope.fdKS.MS_PRODUK_ID, scope : $scope, sn : 'fdKS'});
//        
//            if ($scope.fdKS.MS_PROGRAM_ID)
//                apiData.getProgramDetail({id : $scope.fdKS.MS_PROGRAM_ID, scope : $scope, sn : 'fdKS'});

            apiData.getCalculateProdukProgram({id_produk : $scope.fdKS.MS_PRODUK_ID, id_program : $scope.fdKS.MS_PROGRAM_ID, scope : $scope, sn : 'fdKS', id_pembiayaan : $scope.fdKS.MS_JENIS_PEMBIAYAAN_ID});
            
        }
    });
    
    $scope.$watchGroup(['fdKS.MS_PLAFOND','fdKS.MS_TENOR','fdKS.MS_BUNGA_PERBULAN'],function(dataLoaded, oldValue){
        if (dataLoaded) {
            console.log('bunganya'+$scope.fdKS.MS_BUNGA_PERBULAN);
            
            if (!$scope.fdKS.MS_ANGSURAN_PERBULAN){
                $scope.fdKS.MS_ANGSURAN_PERBULAN = ( $scope.fdKS.MS_PLAFOND / $scope.fdKS.MS_TENOR ) + ($scope.fdKS.MS_PLAFOND * $scope.fdKS.MS_BUNGA_PERBULAN / 100);
            }
            
            $scope.checkTenorMinMax = function(){
                if (parseInt($scope.fdKS.MS_TENOR) < parseInt($scope.fdKS.MS_TENOR_MIN) || parseInt($scope.fdKS.MS_TENOR) > parseInt($scope.fdKS.MS_TENOR_MAX)){
                    $scope.fdKS.MS_TENOR = $scope.fdKS.MS_TENOR_MID;
                    globalFunction.ag('danger',['Tenor tidak kurang atau melebihi ketentuan yang berlaku']);
                }
            };
            
            $scope.checkPlafondMinMax = function(){
                if ($scope.fdKS.MS_PLAFOND < $scope.fdKS.MS_PLAFOND_MIN || $scope.fdKS.MS_PLAFOND > $scope.fdKS.MS_PLAFOND_MAX){
                    $scope.fdKS.MS_PLAFOND = $scope.fdKS.MS_PLAFOND_MID;
                    globalFunction.ag('danger',['Palfond tidak kurang atau melebihi ketentuan yang berlaku']);
                }
            };
            
        }
        
        console.log('old value ',oldValue);
        
        console.log('focus ',oldValue);
        
    });
    
    $scope.$watchGroup(['fdKS.MS_ANGSURAN_PERBULAN'],function(dataLoaded, oldValue){
        if (dataLoaded) {
            var pembulatan = 50;
//            $scope.fdKS.MS_ANGSURAN_PERBULAN_PEMBULATAN = ( $scope.fdKS.MS_ANGSURAN_PERBULAN % pembulatan );
            $scope.fdKS.MS_ANGSURAN_PERBULAN_PEMBULATAN = Math.round($scope.fdKS.MS_ANGSURAN_PERBULAN) - ( Math.round($scope.fdKS.MS_ANGSURAN_PERBULAN) % pembulatan ) + (((Math.round($scope.fdKS.MS_ANGSURAN_PERBULAN) % pembulatan) < (pembulatan / 2)) ? 0 : pembulatan);
            console.log('PEMBULATAN',(Math.round($scope.fdKS.MS_ANGSURAN_PERBULAN) % pembulatan));
        }
    });
    
    $scope.getCalculateProdukProgram = function(d){
        apiData.getCalculateProdukProgram({id_produk : d['id_produk'], id_program : d['id_program'], id_pembiayaan : d['id_pembiayaan'], scope : $scope, sn : 'fdKS', t : 'onchange'});
    };
    
//    $scope.getDetailProduk = function(id){
//        apiData.getProdukDetail({id : id, scope : $scope, sn : 'fdKS', t : 'onchange'});
//    };
//    
//    $scope.getDetailProgram = function(id){
//        apiData.getProgramDetail({id : id, scope : $scope, sn : 'fdKS', t : 'onchange'});
//    };
    
})
.controller('rincianPinjamanSurveyCtrl',function(modalService,$scope,apiData,apiBase,$stateParams,$rootScope,globalFunction){
    
    $rootScope.getlistKSRP = function(id,flag){
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_rincianpinjamanlist/?id='+id+'&flag='+flag,
            scope   : $scope,
            sn      : 'listKSRP'+flag,
            type    : 'tolist'
        });
    };
    $rootScope.getlistKSRP($stateParams.id,'DEBITUR');
    $rootScope.getlistKSRP($stateParams.id,'KELUARGA');
    $rootScope.getlistKSRP($stateParams.id,'PENJAMIN');

    $scope.editKSRP = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'survey/get_rincianpinjamanid/?id='+id,
            scope   : $rootScope,
            sn      : 'fdKSRP',
            setdate : [{ k : 'dtJT', v : 'SV_JATUH_TEMPO'}]
        });
        $scope.modalKRP('e');
    };

    $scope.deleteKSRP = function(d){
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Hapus',
            headerText: 'Hapus Rincian Pinjaman',
            bodyText: 'Apakah anda yakin menghapus rincian pinjaman ini ?'
        }).then(function (result) {
            apiData.post({
                gl      : true,
                api     : apiBase+'survey/delete_rincianpinjaman',
                data    : d,
                scope   : $scope,
                type    : 'tolist',
                reload  : 'getlistKSRP'
            });
        });
    };
    
    $scope.modalKRP = function(t){
        
        if (t='n')
            $rootScope.fdKSRP = {};
            
        var m = globalFunction.openModal('partials/modals/modal-survey-rincian-pinjaman.html','modal-form modal-rincian-pinjaman','modalRincianPinjamanSurveyCtrl');
        
        $rootScope.closemodalKRP = function() { m.close(); }; 
    };
    
    $scope.viewKSRP = function(id){
        apiData.get_view({
            gl      : true,
            api     : apiBase+'survey/get_rincianpinjamanid/?id='+id,
            scope   : $scope,
            fd      : 'fdKSRP',
            title   : 'Keuangan - Rincian Pinjaman'
        });
        $scope.$watch('fdKSRP',function(){
            $rootScope.ROW_VIEW = [
//                { k : 'Id', v : $scope.fdKSRP.SV_INDIVIDU_PINJAMAN_LAIN_ID },
                { k : 'Nama Bank', v : $scope.fdKSRP.MS_BANK_ID_DESKRIPSI },
                { k : 'Plafond', v : $scope.fdKSRP.SV_PLAFOND, t : 'number' },
                { k : 'Baki Debet', v : $scope.fdKSRP.SV_BAKI_DEBET, t : 'number' },
                { k : 'Angsuran', v : $scope.fdKSRP.SV_ANGSURAN, t : 'number' },
                { k : 'Keterangan', v : $scope.fdKSRP.MS_TUJUAN_PEMBIAYAAN_ID_DESKRIPSI },
                { k : 'Jatuh Tempo', v : $scope.fdKSRP.SV_JATUH_TEMPO },
                { k : 'Kolektibilitas', v : $scope.fdKSRP.MS_KOLEKTIBILITAS_ID_DESKRIPSI }
            ];
        });
    };
    
})
.controller('modalRincianPinjamanSurveyCtrl',function($scope,apiData,apiBase,$stateParams){
    
    $scope.postKSRP = function(){
//        if ($scope.fdKSRP == undefined)
//            $scope.fdKSRP = {};
        $scope.fdKSRP.DB_PROSPEK_ID = $stateParams.id;
        apiData.post({
            gl      : true,
            api     : apiBase+'survey/post_rincianpinjaman',
            data    : $scope.fdKSRP,
            scope   : $scope,
            type    : 'tolist',
            reloadr : { k : 'getlistKSRP', v : $stateParams.id },
            ag      : 'on-modal',
            cm      : 'closemodalKRP',
            callbacksuccess : function(R){
                angular.element(document.getElementById('IdRincianPinjamanList')).scope().getlistCSRP($stateParams.id,'DEBITUR');
                angular.element(document.getElementById('IdRincianPinjamanList')).scope().getlistCSRP($stateParams.id,'KELUARGA');
                angular.element(document.getElementById('IdRincianPinjamanList')).scope().getlistCSRP($stateParams.id,'PENJAMIN');
            }
        });
    };
    
    $scope.getlistKeluargaKSRP = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'prospek/get_detailkeluargalist/?id='+id,
            scope   : $scope,
            sn      : 'listKeluargaKSRP',
            type    : 'tolist'
        });
    };
    $scope.getlistKeluargaKSRP($stateParams.id);
    
})
;

/* Angsuran */

App.controller('rincianAngsuranCtrl',function($scope,globalFunction,$state,apiData){
    
    $scope.$watch('DS', function(dataLoaded) {
        if (dataLoaded){
            if ($scope.JPem.MS_JENIS_PEMBIAYAAN_ID == 111){
                $state.go('survey.keuangan.angsuran.3r');
            } else {
                $state.go('survey.keuangan.angsuran.baru');
            }
        }
    });
    
});

App.controller('rincianAngsuranBaruCtrl', function($scope,$http,$state,$rootScope,globalFunction,apiData,apiBase,postJadwal,globalFunction,$stateParams){
    
    $scope.fdASBR = {};
    $scope.fdASBR.sdate = new Date();
    $scope.dtSDate = new Date($scope.fdASBR.sdate);
    
    $scope.$watch('fdKS', function(dataLoaded) {
        if (dataLoaded){
            $scope.fdASBR.MS_PLAFOND = $scope.fdKS.MS_PLAFOND;
            $scope.fdASBR.MS_TENOR = $scope.fdKS.MS_TENOR;
            $scope.fdASBR.MS_BUNGA_PERBULAN = $scope.fdKS.MS_BUNGA_PERBULAN;
        }
    });
        
//    $scope.postKSBR = function(){
//        $scope.fdKSBR.DB_PROSPEK_ID = $stateParams.id;
//        apiData.post({
//            gl      : true,
//            api     : apiBase+'survey/post_alldata',
//            data    : $scope.fdKSBR,
//            scope   : $scope,
//            type    : 'tolist'
//        });
//    };
	
    $scope.buatjadwal = function(){
        $scope.fdASBR.DB_PROSPEK_ID = $stateParams.id;
        apiData.post({
            gl      : true,
            api     : apiBase+'survey/post_createjadwalangsuran',
            data    : $scope.fdASBR,
            scope   : $scope,
            type    : 'tolist',
            reload  : 'getlJadwalAngsuran'
        });
    };
	
    $scope.getlJadwalAngsuran = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_jadwalangsuran/?id='+id,
            scope   : $scope,
            sn      : 'listJA',
            type    : 'tolist'
        });
    };
    $scope.getlJadwalAngsuran($stateParams.id);
    
    $scope.PokokBunga = function(A,B){
        return parseInt(A) + parseInt(B);
    };
    
})

.controller('rincianAngsuran3RCtrl', function($scope,$rootScope,globalFunction,apiData,apiBase,postJadwal,globalFunction,$stateParams,Excel,$timeout){
    			
    $scope.fdAS3R = {};
    
    $scope.$watch('fdKS', function(dataLoaded) {
        if (dataLoaded){
            $scope.fdAS3R.MS_PLAFOND = $scope.fdKS.MS_PLAFOND;
            $scope.fdAS3R.MS_TENOR = $scope.fdKS.MS_TENOR;
            $scope.fdAS3R.MS_BUNGA_PERBULAN = $scope.fdKS.MS_BUNGA_PERBULAN;
        }
    });
    
//    $scope.postKS = function(){
//        $scope.fdKS.DB_PROSPEK_ID = $stateParams.id;
//        apiData.post({
//            gl      : true,
//            api     : apiBase+'survey/post_alldata',
//            data    : $scope.fdKS,
//            scope   : $scope,
//            type    : 'tolist'
//        });
//    };

    $scope.getlistRek = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_rekeningdebitur/?id='+id,
            scope   : $scope,
            sn      : 'getlistRek',
            type    : 'tolist'
        });
    };
    $scope.getlistRek($stateParams.id);
	
    $scope.postJA = function(){
        // console.log('working');
        $scope.fdAS3R.DB_PROSPEK_ID = $stateParams.id;
        var data = $scope.fdAS3R;    
        console.log(data);
        postJadwal.uploadFileToUrl(data,$scope);
        $scope.fdAS3R.fileToUpload = '';
    };
    
    $scope.$watch('fdAS3R.fileToUpload',function(newValue){
        if(newValue){
            $scope.postJA();
        }
    });
	
    $scope.getlJadwalAngsuran = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_jadwalangsuran/?id='+id,
            scope   : $scope,
            sn      : 'listJA',
            type    : 'tolist'			
        });
    };
    $scope.getlJadwalAngsuran($stateParams.id);
    
    $scope.PokokBunga = function(A,B){
        return parseInt(A) + parseInt(B);
    };    

	$scope.exportToExcel=function(tableId,filename){ // FZL			
		var exportHref=Excel.tableToExcel(tableId,'JadwalAngsuran3r');		
		// $timeout(function(){location.href=exportHref;},100);
		var a = document.createElement('a');
		a.href = exportHref; 
		a.target = '_blank';
		a.download = filename+'.xls';
		document.body.appendChild(a);
		a.click();
    }					
});

/* Kebutuhan Modal Kerja */

App.controller('kebutuhanModalKerjaCtrl',function($scope,apiData,apiBase,globalFunction,$stateParams){
    
    $scope.fdKMK = {};
    
    $scope.postKMK = function(){		
		if ($scope.formValid()){/*FZL penambahan validasi*/
			$scope.fdKMK.DB_PROSPEK_ID = $stateParams.id;
			apiData.post({
				gl      : true,
				api     : apiBase+'survey/post_alldata',
				data    : $scope.fdKMK,
				scope   : $scope,
				type    : 'tolist',
				callbacksuccess : function(){
					for (var k in $scope.fdKMK){
						if ($scope.DS.KEBUTUHAN_MODAL_KERJA.KEBUTUHAN_INDEX.hasOwnProperty(k)) {
							$scope.DS.KEBUTUHAN_MODAL_KERJA.KEBUTUHAN_INDEX[k] = $scope.fdKMK[k];
						}
						if ($scope.DS.KEBUTUHAN_MODAL_KERJA.MS_EXSUM_OMSET.hasOwnProperty(k)) {
							$scope.DS.KEBUTUHAN_MODAL_KERJA.MS_EXSUM_OMSET[k] = $scope.fdKMK[k];
						}
					}
				}
			});
		};
    };
	
	/*FZL 10/4/2018*/
	$scope.formValid = function(){
        var e = globalFunction.formValidation({
            scope : $scope,
            form  : 'fdKMK',
            field : [
                { fn : 'MS_PERPUTARAN_PERSEDIAAN_BARANG',  fk : 'Perputaran Persediaan Barang' },
                { fn : 'MS_PERSEDIAAN_LAINNYA',  fk : 'Persediaan Lainnya' },
                { fn : 'MS_PIUTANG_DAGANG',  fk : 'Piutang Dagang' },
                { fn : 'MS_PIUTANG_LAINNYA',  fk : 'Piutang Lainnya' },
                { fn : 'MS_UTANG_DAGANG',  fk : 'Utang Dagang' },
                { fn : 'MS_UTANG_LAINNYA',  fk : 'Utang Lainnya' },
                { fn : 'MS_MODAL_KERJA',  fk : 'Modal Kerja' },
                { fn : 'MS_INVESTASI',  fk : 'Investasi' },
                { fn : 'MS_OMSET_TAHUN_LALU',  fk : 'Omset / Pendapatan Usaha Tahun Lalu' },
                { fn : 'MS_PENGHASILAN_BERSIH_TAHUN_LALU',  fk : 'Laba / Rugi / Penghasilan Bersih Tahun Lalu' },
                { fn : 'MS_MODAL_KERJA_TAHUN_LALU',  fk : 'Modal Kerja - Bersih Tahun Lalu' },
                { fn : 'MS_TOTAL_UTANG',  fk : 'Total Utang Tahun Lalu' }
            ]
        });
        return e;
    };
    
//    apiData.get_DS();
    
    $scope.$watch('DS', function(dataLoaded) {
        if (dataLoaded) {
            $scope.fdKMK = globalFunction.collectObject($scope.DS.KEBUTUHAN_MODAL_KERJA.KEBUTUHAN_INDEX,$scope.DS.KEBUTUHAN_MODAL_KERJA.MS_EXSUM_OMSET);
            if ($scope.fdKMK.MS_POSISI_AKHIR_BULAN_TERAKHIR)
                $scope.dtPABT = new Date($scope.fdKMK.MS_POSISI_AKHIR_BULAN_TERAKHIR);
        }
    });
    
    $scope.$watchGroup(['fdKMK.MS_PERSEDIAAN_DAGANG','fdKMK.MS_PERSEDIAAN_LAINNYA'], function(dataLoaded){
        if (dataLoaded){
            $scope.fdKMK.TOTAL_PERSEDIAAN = parseInt($scope.fdKMK.MS_PERSEDIAAN_DAGANG) + parseInt($scope.fdKMK.MS_PERSEDIAAN_LAINNYA);
        }
    });
    
    $scope.$watchGroup(['fdKMK.MS_PIUTANG_DAGANG','fdKMK.MS_PIUTANG_LAINNYA'], function(dataLoaded){
        if (dataLoaded){
            $scope.fdKMK.TOTAL_PIUTANG = parseInt($scope.fdKMK.MS_PIUTANG_DAGANG) + parseInt($scope.fdKMK.MS_PIUTANG_LAINNYA);
        }
    });
    
    $scope.$watchGroup(['fdKMK.MS_UTANG_DAGANG','fdKMK.MS_UTANG_LAINNYA'], function(dataLoaded){
        if (dataLoaded){
            $scope.fdKMK.TOTAL_UTANG = parseInt($scope.fdKMK.MS_UTANG_DAGANG) + parseInt($scope.fdKMK.MS_UTANG_LAINNYA);
        }
    });
    
    $scope.$watchGroup(['DS.KEUANGAN.KEUANGAN_INDEX.MS_HARGA_POKOK_PENJUALAN','fdKMK.TOTAL_PERSEDIAAN'], function(dataLoaded){
        if (dataLoaded){
            if ($scope.DS.KEUANGAN.KEUANGAN_INDEX.MS_HARGA_POKOK_PENJUALAN == 0)
                $scope.fdKMK.MS_PERPUTARAN_PERSEDIAAN_BARANG = 0;
            else
                $scope.fdKMK.MS_PERPUTARAN_PERSEDIAAN_BARANG = parseInt($scope.fdKMK.TOTAL_PERSEDIAAN) / parseInt($scope.DS.KEUANGAN.KEUANGAN_INDEX.MS_HARGA_POKOK_PENJUALAN) * 30;
        }
    });
    
    $scope.$watchGroup(['DS.KEBUTUHAN_MODAL_KERJA.KEBUTUHAN_INDEX.MS_OMSET_PERBULAN','fdKMK.TOTAL_PIUTANG'], function(dataLoaded){
        if (dataLoaded){
            if ($scope.DS.KEUANGAN.KEUANGAN_INDEX.MS_OMSET_PERBULAN == 0)
                $scope.fdKMK.MS_PERPUTARAN_PIUTANG_DAGANG = 0;
            else
                $scope.fdKMK.MS_PERPUTARAN_PIUTANG_DAGANG = parseInt($scope.fdKMK.TOTAL_PIUTANG) / parseInt($scope.DS.KEUANGAN.KEUANGAN_INDEX.MS_OMSET_PERBULAN) * 30;
        }
    });
    
    $scope.$watchGroup(['DS.KEUANGAN.KEUANGAN_INDEX.MS_HARGA_POKOK_PENJUALAN','fdKMK.TOTAL_UTANG'], function(dataLoaded){
        if (dataLoaded){
            if ($scope.DS.KEUANGAN.KEUANGAN_INDEX.MS_HARGA_POKOK_PENJUALAN == 0)
                $scope.fdKMK.MS_PERPUTARAN_UTANG_DAGANG = 0;
            else
                $scope.fdKMK.MS_PERPUTARAN_UTANG_DAGANG = parseInt($scope.fdKMK.TOTAL_UTANG) / parseInt($scope.DS.KEUANGAN.KEUANGAN_INDEX.MS_HARGA_POKOK_PENJUALAN) * 30;
        }
    });
    
    $scope.$watchGroup(['fdKMK.TOTAL_PERSEDIAAN','fdKMK.TOTAL_PIUTANG','fdKMK.TOTAL_UTANG'], function(dataLoaded){
        if (dataLoaded){
            $scope.fdKMK.MS_MODAL_KERJA = ( parseInt($scope.fdKMK.TOTAL_PERSEDIAAN) + parseInt($scope.fdKMK.TOTAL_PIUTANG) ) - parseInt($scope.fdKMK.TOTAL_UTANG);
        }
    });
    
})
.controller('asetSurveyCtrl',function(modalService,$scope,apiData,apiBase,$stateParams,$rootScope,globalFunction){
    
    $scope.fdAST = {};
    
    $scope.postAST = function(){
        if ($scope.formValid()){
            $scope.fdAST.DB_PROSPEK_ID = $stateParams.id;
            apiData.post({
                gl      : true,
                api     : apiBase+'survey/post_aset',
                data    : $scope.fdAST,
                scope   : $scope,
                type    : 'tolist',
                reload  : 'getlistAST',
                fd      : 'fdAST'
            });
        }
    };
		

    $scope.getlistAST = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_asetlist/?id='+id,
            scope   : $scope,
            sn      : 'listAST',
            type    : 'tolist'
        });
    };
    $scope.getlistAST($stateParams.id);

    $scope.editAST = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'survey/get_asetid/?id='+id,
            scope   : $scope,
            sn      : 'fdAST'
        });
    };

    $scope.deleteAST = function(d){
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Hapus',
            headerText: 'Hapus Aset',
            bodyText: 'Apakah anda yakin menghapus aset ini ?'
        }).then(function (result) {
            apiData.post({
                gl      : true,
                api     : apiBase+'survey/delete_aset',
                data    : d,
                scope   : $scope,
                type    : 'tolist',
                reload  : 'getlistAST'
            });
        });
    };
    
    $scope.viewAST = function(id){
        apiData.get_view({
            gl      : true,
            api     : apiBase+'survey/get_asetid/?id='+id,
            scope   : $scope,
            fd      : 'fdAST',
            title   : 'Kebutuhan Modal Kerja - Aset'
        });
        $scope.$watch('fdAST',function(){
            $rootScope.ROW_VIEW = [
//                { k : 'Id', v : $scope.fdAST.SV_INDIVIDU_ASSET_ID },
                { k : 'Jenis Aset', v : $scope.fdAST.MS_JENIS_ASSET_ID_DESKRIPSI },
                { k : 'Jumlah', v : $scope.fdAST.SV_NILAI_ASSET, t : 'number' }
            ];
        });
    };
    
    $scope.formValid = function(){
        var e = globalFunction.formValidation({
            scope : $scope,
            form  : 'fdAST',
            field : [
                { fn : 'MS_JENIS_ASSET_ID',  fk : 'Jenis aset' },
                { fn : 'SV_NILAI_ASSET',  fk : 'Nilai aset' }
            ]
        });
        return e;
    };
	
	$scope.resetfdAST = function() {
		$scope.fdAST = {};
	};
    
})
.controller('rabSurveyCtrl',function(modalService,$scope,apiData,apiBase,$stateParams,$rootScope,globalFunction){
    
    $scope.fdRAB = {};
    
    $scope.postRAB = function(){
        if ($scope.formValid()){
            $scope.fdRAB.DB_PROSPEK_ID = $stateParams.id;
            apiData.post({
                gl      : true,
                api     : apiBase+'survey/post_rab',
                data    : $scope.fdRAB,
                scope   : $scope,
                type    : 'tolist',
                reload  : 'getlistRAB',
                fd      : 'fdRAB'
            });
        }
    };

    $scope.getlistRAB = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_rablist/?id='+id,
            scope   : $scope,
            sn      : 'listRAB',
            type    : 'tolist'
        });
    };
    $scope.getlistRAB($stateParams.id);

    $scope.editRAB = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'survey/get_rabid/?id='+id,
            scope   : $scope,
            sn      : 'fdRAB'
        });
    };

    $scope.deleteRAB = function(d){
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Hapus',
            headerText: 'Hapus RAB',
            bodyText: 'Apakah anda yakin menghapus RAB ini ?'
        }).then(function (result) {
            apiData.post({
                gl      : true,
                api     : apiBase+'survey/delete_rab',
                data    : d,
                scope   : $scope,
                type    : 'tolist',
                reload  : 'getlistRAB'
            });
        });
    };
    
    $scope.viewRAB = function(id){
        apiData.get_view({
            gl      : true,
            api     : apiBase+'survey/get_rabid/?id='+id,
            scope   : $scope,
            fd      : 'fdRAB',
            title   : 'Kebutuhan Modal Kerja - Rencana Anggaran Belanja'
        });
        $scope.$watch('fdRAB',function(){
            $rootScope.ROW_VIEW = [
//                { k : 'Id', v : $scope.fdRAB.SV_INDIVIDU_RAB_ID },
                { k : 'Tujuan Pembiayaan', v : $scope.fdRAB.MS_TUJUAN_PEMBIAYAAN_ID_DESKRIPSI },
                { k : 'Jumlah', v : $scope.fdRAB.SV_JML_RAB, t : 'number' },
                { k : 'Keterangan', v : $scope.fdRAB.SV_KETERANGAN }
            ];
        });
    };
    
    $scope.formValid = function(){
        var e = globalFunction.formValidation({
            scope : $scope,
            form  : 'fdRAB',
            field : [
                { fn : 'MS_TUJUAN_PEMBIAYAAN_ID',  fk : 'Tujuan pembiayaan' },
                { fn : 'SV_JML_RAB',  fk : 'Jumlah RAB' },
                { fn : 'SV_KETERANGAN',  fk : 'Keterangan' }
            ]
        });
        return e;
    };
	
	$scope.resetfdRAB = function() {
		$scope.fdRAB = {};
	};
    
})
.controller('dokumenRabSurveyCtrl',function(modalService,$scope,apiData,apiBase,$stateParams,postDOC,$rootScope,globalFunction){
    
    $scope.fdDRAB = {};
    
    $scope.postDRAB = function(){
        if ($scope.formValid()){
//        postDRAB.e($scope.fdDRAB,$scope);
            $scope.fdDRAB.DB_PROSPEK_ID = $stateParams.id;
            $scope.fdDRAB.DB_HEADER = 'RAB';
            $scope.fdDRAB.DB_HEADER_ID = '';
            postDOC.e($scope.fdDRAB,$scope,function(){
                $scope.fdDRAB.PR_DOKUMEN = null;
            });
        }
    };

    $scope.getlistDRAB = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_dokumenrablist/?id='+id+'&header=RAB',
            scope   : $scope,
            sn      : 'listDRAB',
            type    : 'tolist'
        });
    };
    $scope.getlistDRAB($stateParams.id);

    $scope.editDRAB = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'prospek/get_dokumenid/?id='+id,
            scope   : $scope,
            sn      : 'fdDRAB'
        });
    };

    $scope.deleteDRAB = function(d){
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Hapus',
            headerText: 'Hapus Dokumen RAB',
            bodyText: 'Apakah anda yakin menghapus dokumen RAB ini ?'
        }).then(function (result) {
            apiData.post({
                gl      : true,
                api     : apiBase+'prospek/delete_dokumen',
                data    : d,
                scope   : $scope,
                type    : 'tolist',
                reload  : 'getlistDRAB'
            });
        });
        
    };
    
    $scope.viewDRAB = function(id){
        apiData.get_view({
            gl      : true,
            api     : apiBase+'prospek/get_dokumenid/?id='+id,
            scope   : $scope,
            fd      : 'fdDRAB',
            title   : 'Kebutuhan Modal Kerja - Dokumen RAB'
        });
        $scope.$watch('fdDRAB',function(){
            $rootScope.ROW_VIEW = [
//                { k : 'Id', v : $scope.fdDRAB.PR_INDIVIDU_DOKUMEN_ID },
                { k : 'Jenis Dokumen', v : $scope.fdDRAB.MS_JENIS_DOKUMEN },
                { k : 'File', v : $scope.fdDRAB.NODE_ID, t : 'file', d : $scope.fdDRAB.PR_PATH_DOKUMEN }
            ];
        });
    };
    
    $scope.formValid = function(){
        var e = globalFunction.formValidation({
            scope : $scope,
            form  : 'fdDRAB',
            field : [
                { fn : 'MS_JENIS_DOKUMEN_ID',  fk : 'File dokumen' },
                { fn : 'PR_DOKUMEN',  fk : 'Jenis dokumen' }
            ]
        });
        return e;
    };
    
	$scope.resetfdDRAB = function() {
		$scope.fdDRAB = {};
	};
	
});

App.controller('keluargaSurveyCtrl',function($scope,apiData,apiBase,globalFunction,$stateParams){
    
    $scope.fdKLGS = {};
    
    $scope.postKLGS = function(){
		if ($scope.formValid()){/*fzl penambahan validasi*/
			$scope.fdKLGS.DB_PROSPEK_ID = $stateParams.id;
			apiData.post({
				gl      : true,
				api     : apiBase+'survey/post_alldata',
				data    : $scope.fdKLGS,
				scope   : $scope,
				type    : 'tolist',
				callbacksuccess : function(){
					for (var k in $scope.fdKLGS){
						if ($scope.DS.KELUARGA.KELUARGA_INDEX.hasOwnProperty(k)) {
							$scope.DS.KELUARGA.KELUARGA_INDEX[k] = $scope.fdKLGS[k];
						}
					}
				}
			});
		};
    };
	
	/*FZL 10/4/2018*/
	$scope.formValid = function(){
        var e = globalFunction.formValidation({
            scope : $scope,
            form  : 'fdKLGS',
            field : [
                { fn : 'MS_JML_TANGGUNGAN_ISTRI',  fk : 'Jml Tanggungan (suami/istri)' },
                { fn : 'MS_JML_TANGGUNGAN_ANAK',  fk : 'Jml Tanggungan (anak)' },
                { fn : 'MS_JML_TANGGUNGAN_LAINNYA',  fk : 'Jml Tanggungan Lainnya' },
                { fn : 'MS_PASANGAN_BEKERJA',  fk : 'Pasangan Bekerja' },
                { fn : 'MS_ANAK_BEKERJA',  fk : 'Anak Yang Sudah Bekerja' },
                { fn : 'MS_ORANG_TUA_BEKERJA',  fk : 'Orang Tua Bekerja' }
            ]
        });
        return e;
    };
    
//    apiData.get_DS();
    		
    $scope.$watch('DS', function(dataLoaded) {
        if (dataLoaded) {
            $scope.fdKLGS = globalFunction.collectObject($scope.DS.KELUARGA.KELUARGA_INDEX);
            if (!$scope.fdKLGS.MS_JML_TANGGUNGAN_ISTRI)
                $scope.fdKLGS.MS_JML_TANGGUNGAN_ISTRI = 0;
            if (!$scope.fdKLGS.MS_JML_TANGGUNGAN_ANAK)
                $scope.fdKLGS.MS_JML_TANGGUNGAN_ANAK = 0;
            if (!$scope.fdKLGS.MS_JML_TANGGUNGAN_LAINNYA)
                $scope.fdKLGS.MS_JML_TANGGUNGAN_LAINNYA = 0;
        }
    });
    
    $scope.$watchGroup([
        'fdKLGS.MS_JML_TANGGUNGAN_ISTRI',
        'fdKLGS.MS_JML_TANGGUNGAN_ANAK',
        'fdKLGS.MS_JML_TANGGUNGAN_LAINNYA'
    ], function(dataLoaded) {
        if (dataLoaded) {
            $scope.fdKLGS.MS_JML_TANGGUNGAN = 
            parseInt($scope.fdKLGS.MS_JML_TANGGUNGAN_ISTRI) + 
            parseInt($scope.fdKLGS.MS_JML_TANGGUNGAN_ANAK) + 
            parseInt($scope.fdKLGS.MS_JML_TANGGUNGAN_LAINNYA);
        }
    });
    
})
.controller('keluargaDetailSurveyCtrl',function(modalService,$scope,apiData,apiBase,$stateParams,$rootScope){
    
    $scope.fdKDS = {};
    
    $scope.postKDS = function(){
        $scope.fdKDS.DB_PROSPEK_ID = $stateParams.id;
        apiData.post({
            gl      : true,
            api     : apiBase+'prospek/post_detailkeluarga',
            data    : $scope.fdKDS,
            scope   : $scope,
            type    : 'tolist',
            reload  : 'getlistKDS',
            fd      : 'fdKDS',
			resetdate : [ //FZL 8/10/2018
				{ k : 'dtFDTL', v : '' },
				{ k : 'dtMBI', v : '' }
			]
			
        });
    };

    $scope.getlistKDS = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'prospek/get_detailkeluargalist/?id='+id,
            scope   : $scope,
            sn      : 'listKDS',
            type    : 'tolist'
        });
    };
    $scope.getlistKDS($stateParams.id);

    $scope.editKDS = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'prospek/get_detailkeluargaid/?id='+id,
            scope   : $scope,
            sn      : 'fdKDS'
        });
        $scope.$watch('fdKDS', function(dataLoaded) {
            if (dataLoaded) {
                $scope.dtFDTL = new Date($scope.fdKDS.PR_TANGGAL_LAHIR);
                $scope.dtMBI = new Date($scope.fdKDS.PR_MASA_BERLAKU_IDENTITAS);
                if ($scope.fdKDS.PR_MASA_BERLAKU_IDENTITAS == '9999-12-31')
                    $scope.fdKDS.masa_berlaku_identitas_seumur_hidup = 1;
            }
        });
    };

    $scope.deleteKDS = function(d){
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Hapus',
            headerText: 'Hapus Data Keluarga',
            bodyText: 'Apakah anda yakin menghapus data kelurga ini ?'
        }).then(function (result) {
            apiData.post({
                gl      : true,
                api     : apiBase+'prospek/delete_detailkeluarga',
                data    : d,
                scope   : $scope,
                type    : 'tolist',
                reload  : 'getlistKDS'
            });
        });
    };
    
    $scope.viewKDS = function(id){
        apiData.get_view({
            gl      : true,
            api     : apiBase+'prospek/get_detailkeluargaid/?id='+id,
            scope   : $scope,
            fd      : 'fdKDS',
            title   : 'Keluarga - Detail'
        });
        $scope.$watch('fdKDS',function(){
            $rootScope.ROW_VIEW = [
//                { k : 'Id', v : $scope.fdKDS.PR_INDIVIDU_KELUARGA_ID },
                { k : 'Status Hubungan Keluarga', v : $scope.fdKDS.MS_JENIS_STATUS_HUBUNGAN_KELUARGA },
                { k : 'Nama lengkap', v : $scope.fdKDS.PR_NAMA_LENGKAP },
                { k : 'Jenis Kelamin', v : $scope.fdKDS.MS_JENIS_KELAMIN },
                { k : 'Jenis Identitas', v : $scope.fdKDS.MS_JENIS_IDENTITAS },
                { k : 'Nomor Identitas', v : $scope.fdKDS.PR_NO_IDENTITAS },
                { k : 'Masa Berlaku', v : $scope.fdKDS.PR_MASA_BERLAKU_IDENTITAS },
                { k : 'Tempat Lahir', v : $scope.fdKDS.PR_TEMPAT_LAHIR },
                { k : 'Tanggal Lahir', v : $scope.fdKDS.PR_TANGGAL_LAHIR },
                { k : 'Pekerjaan', v : $scope.fdKDS.MS_PEKERJAAN },
                { k : 'Nomor Handphone', v : $scope.fdKDS.PR_NO_HP },
                { k : 'Nomor Telepon', v : $scope.fdKDS.PR_NO_TELP }
            ];
        });
    };
	
	$scope.resetfdKDS = function() {
		$scope.fdKDS = {};
		$scope.dtFDTL = '';
		$scope.dtMBI = '';		
	};
    
});

/* Agunan Survey */

App.controller('agunanSurveyCtrl',function(modalService, $scope, apiData, $rootScope, $location, globalFunction, apiBase, $stateParams, $sce,jasperBase ,getKelengkapanDataById){

    
    $rootScope.listAS = []; $scope.fdPL = {}; $scope.fdPL.MAX_SIZE = 5; $scope.fdPL.LIMIT = 10;  $scope.fdAS = {};
    
    $scope.KEYUP_NAMA_PEMILIK = function(){
        $scope.fdAS.DB_NAMA_PEMILIK = '';
        for (var x in $scope.fdAS.NUM_NAMA_PEMILIK){
            if (typeof $scope.fdAS.NUM_NAMA_PEMILIK[x] !== 'function') {
                if (x > 0)
                    $scope.fdAS.DB_NAMA_PEMILIK += ' | ';
                $scope.fdAS.DB_NAMA_PEMILIK += $scope.fdAS.DB_NAMA_PEMILIK_PART[$scope.fdAS.NUM_NAMA_PEMILIK[x]] != undefined ? $scope.fdAS.DB_NAMA_PEMILIK_PART[$scope.fdAS.NUM_NAMA_PEMILIK[x]] : '' ;
//                console.log(x);
            }
        }
    };
    
    $scope.SET_NAMA_PEMILIK_PART = function(){
        $scope.fdAS.NUM_NAMA_PEMILIK = [];
        $scope.fdAS.DB_NAMA_PEMILIK_PART = [];
        var NS = $scope.fdAS.DB_NAMA_PEMILIK.split('|');
        for (var x in NS){
            if (typeof NS[x] !== 'function') {
                $scope.fdAS.NUM_NAMA_PEMILIK.push(x);
                $scope.fdAS.DB_NAMA_PEMILIK_PART[x] = NS[x];
            }
        }
    };
    
    $scope.ADD_NUM_NAMA_PEMILIK = function(){
        $scope.fdAS.NUM_NAMA_PEMILIK.push(window.Math.max.apply(null, $scope.fdAS.NUM_NAMA_PEMILIK) + 1);
    };
    
    $scope.REMOVE_NUM_NAMA_PEMILIK = function(d){
        if ($scope.fdAS.NUM_NAMA_PEMILIK.length > 1){
            var array = $scope.fdAS.NUM_NAMA_PEMILIK;

            var index = array.indexOf(d.id);
            if (index > -1) {
              array.splice(index, 1);
            }

            delete $scope.fdAS.DB_NAMA_PEMILIK_PART[d.id];
            
            $scope.KEYUP_NAMA_PEMILIK();
        }
    };
	
    $scope.modalAS = function(t){
        
        if (t=='N')
            $scope.fdAS = {};
        
        $scope.fdAS.NUM_NAMA_PEMILIK = [0];
        
        var m = globalFunction.openModal('partials/modals/modal-survey-agunan.html','modal-survey-agunan modal-form','modalFormAgunanCtrl',$scope);
        
        $rootScope.closemodalAS = function(){
            m.close();
        };
        
    };
    
    $scope.modalLPNL = function(id,jenis_id){
        
        $rootScope.AGUNAN_ID_SELECTED = id;		
		
        $rootScope.jenis_agunan_id = jenis_id;
		
        console.log($rootScope.jenis_agunan_id);
        
        var m = globalFunction.openModal('partials/modals/modal-survey-list-penilaian.html','modal-survey-list-penilaian modal-form','asListPenilaianModalCtrl',$scope);
        
        $rootScope.closemodalLPNL = function(){
            m.close();
        };
        
    };
    
    $scope.modalBTB = function(id,info_id){
		        
        console.log(id,info_id);
        
        $scope.URL = "http://" + window.location.hostname + ':' + window.location.port+"/#/btb/"+id+"/"+info_id;

        $scope.trustedUrl = $sce.trustAsResourceUrl($scope.URL);
        
//        $scope.BTB_ID_AGUNAN = id;
        
        var m = globalFunction.openModal('partials/modals/modal-btb.html','modal-btb modal-form modal-full-screen','',$scope);
        
        $rootScope.closemodalBTB = function(){
			getKelengkapanDataById.e({scope : $rootScope,id : $stateParams.id,type : 'survey'});                
			console.log('getKelengkapanDataById',$stateParams.id);
            m.close();			
        };
        
    };
    
    $scope.modalBTBList = function(id){
        
        $rootScope.AGUNAN_ID_SELECTED = id;
        
        var m = globalFunction.openModal('partials/modals/modal-btb-list.html','modal-btb-list modal-form','',$scope);
        
        $rootScope.closemodalBTBList = function(){
            m.close();		
        };
        
    };
    
    $rootScope.$on("closeModalBTBGlobal", function(){
        $rootScope.closemodalBTB();		
    });
    
    $rootScope.getlistAS = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_agunanlist/?id='+id,
            scope   : $rootScope,
            sn      : 'listAS',
            type    : 'tolist',
            callbacksuccess : function(){
                $scope.fdPL.TOTAL_ITEMS = $scope.listAS.length;	
            }
        });
    };
    $rootScope.getlistAS($stateParams.id);

    $scope.editAS = function(id){
        $scope.fdAS = {};
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_agunanid/?id='+id,
            scope   : $scope,
            sn      : 'fdAS',
            type    : 'object',
            alamat  : true,
            setdate : [
                        { k : 'dtTKST', v : 'DB_TGL_KELUAR_SURAT_TANAH' },
                        { k : 'dtTTI', v : 'DB_TGL_IMB' },
                        { k : 'dtAJB', v : 'DB_TGL_AJB' },
                        { k : 'dtTJTO', v : 'DB_TGL_JATUH_TEMPO' }
                    ],
            callbacksuccess : function(R){
                    $scope.fdAS.DB_BANJIR = R.data.DB_BANJIR;
                
                    if ($scope.fdAS.DB_TELEPON)
                        $scope.fdAS.DB_TELEPON_YN = 1;
                    else	
                        $scope.fdAS.DB_TELEPON_YN = 0;

                    console.log('edit agunan',R);

                    $scope.fdAS.PR_LAMA_MENEMPATI_TAHUN = Math.floor(parseInt(R.data.DB_WAKTU_SEWA) / 12);
                    $scope.fdAS.PR_LAMA_MENEMPATI_BULAN = parseInt(R.data.DB_WAKTU_SEWA) % 12; 	
                    
                    if ($scope.fdAS.DB_LEBAR_JALAN)
                        $scope.fdAS.jalan_akses = 0;
                    else
                        $scope.fdAS.jalan_akses = 1;
                    
                    $scope.SET_NAMA_PEMILIK_PART();
                    
            }
        });
        $scope.modalAS();
    };	
	
    $scope.deleteAS = function(d){
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Hapus',
            headerText: 'Hapus Agunan',
            bodyText: 'Apakah anda yakin menghapus data agunan ini ?'
        }).then(function (result) {
            apiData.post({
                gl      : true,
                api     : apiBase+'survey/delete_agunan',
                data    : d,
                scope   : $scope,
                type    : 'tolist',
    //            reloadr : { k : 'getlistAS', v : $stateParams.id }
                reload  : 'getlistAS'
            });
        });
    };
    
    $scope.viewAS = function(id){
        apiData.get_view({
            gl      : true,
            api     : apiBase+'survey/get_agunanid/?id='+id,
            scope   : $scope,
            fd      : 'fdAS',
            title   : 'Agunan - Detail',
            type    : 'object'
        });
        $scope.$watch('fdAS',function(){
            $rootScope.ROW_VIEW = [
//                { k : 'Id', v : $scope.fdAS.DB_INDIVIDU_AGUNAN_ID },
                { k : 'No LPJ', v : $scope.fdAS.DB_NO_LPJ },
                { k : 'Jenis Agunan', v : $scope.fdAS.MS_JENIS_AGUNAN_ID_DESKRIPSI },
                { k : 'Status Kepemilikan', v : $scope.fdAS.MS_STATUS_KEPEMILIKAN_ID_DESKRIPSI },
                { k : 'Hubungan dgn Pemohon', v : $scope.fdAS.MS_HUBUNGAN_PEMOHON_ID_DESKRIPSI },
                { k : 'Nama Pemilik', v : $scope.fdAS.DB_NAMA_PEMILIK },
                { k : 'Bukti Kepemilikan Agunan', v : $scope.fdAS.MS_BUKTI_KEPEMILIKAN_AGUNAN_ID_DESKRIPSI },
                { k : 'Nomor Surat Tanah', v : $scope.fdAS.DB_NOMOR_SURAT_TANAH },
                { k : 'Lokasi Dikeluarkan Surat Tanah', v : $scope.fdAS.DB_LOKASI_KELUAR_SURAT_TANAH },
                { k : 'Tgl Keluar Surat Tanah ', v : $scope.fdAS.DB_TGL_KELUAR_SURAT_TANAH },
                { k : 'Nomor IMB', v : $scope.fdAS.DB_NO_IMB },
                { k : 'Tgl Terbit IMB', v : $scope.fdAS.DB_TGL_IMB },
                { k : 'Nama Di IMB', v : $scope.fdAS.DB_NAMA_IMB },
                { k : 'Peruntukan Pada IMB', v : $scope.fdAS.DB_PERUNTUKAN_IMB },
                { k : 'Nomor AJB/Hibah/akte peralihan lainnya', v : $scope.fdAS.DB_NO_AJB },
                { k : 'Tgl Terbit AJB', v : $scope.fdAS.DB_TGL_AJB },
                { k : 'AJB Dikeluarkan Oleh', v : $scope.fdAS.DB_AJB_DIKELUARKAN },
                { k : 'Alamat', v : $scope.fdAS.DB_ALAMAT },
                { k : 'RT', v : $scope.fdAS.DB_RT },
                { k : 'RW', v : $scope.fdAS.DB_RW },
                { k : 'Provinsi', v : $scope.fdAS.MS_PROVINSI_ID_DESKRIPSI },
                { k : 'Kabupaten / Kota', v : $scope.fdAS.MS_KABKOT_ID_DESKRIPSI },
                { k : 'Kecamatan', v : $scope.fdAS.MS_KECAMATAN_ID_DESKRIPSI },
                { k : 'Kelurahan', v : $scope.fdAS.MS_KELDES_ID_DESKRIPSI },
                { k : 'Kode Pos', v : $scope.fdAS.MS_KODE_POS_ID },
                { k : 'Peruntukan Lokasi', v : $scope.fdAS.MS_PERUNTUKAN_LOKASI_ID_DESKRIPSI },
                { k : 'Jalan Yang Dilalui', v : $scope.fdAS.MS_JALAN_DILALUI_ID_DESKRIPSI },
                { k : 'Jarak agunan ke unit', v : $scope.fdAS.DB_JARAK_AGUNAN, l : 'KM' },
                { k : 'Bentuk Tanah', v : $scope.fdAS.MS_BENTUK_TANAH_ID_DESKRIPSI },
                { k : 'Luas Tanah(M2)', v : $scope.fdAS.DB_LUAS_TANAH },
                { k : 'Kondisi Permukaan Tanah', v : $scope.fdAS.MS_KONDISI_PERMUKAAN_ID_DESKRIPSI },
                { k : 'Penggunaan Tanah', v : $scope.fdAS.MS_PENGGUNAAN_TANAH_ID_DESKRIPSI },
                { k : 'Bahaya Banjir', v : $scope.fdAS.DB_BANJIR, t : 'yesorno', tv : 1 },
                { k : 'Batas Utara', v : $scope.fdAS.MS_BATAS_UTARA_ID_DESKRIPSI },
                { k : 'Batas Selatan', v : $scope.fdAS.MS_BATAS_SELATAN_ID_DESKRIPSI },
                { k : 'Batas Barat', v : $scope.fdAS.MS_BATAS_BARAT_ID_DESKRIPSI },
                { k : 'Batas Timur', v : $scope.fdAS.MS_BATAS_TIMUR_ID_DESKRIPSI },
                { k : 'Status Tanah', v : $scope.fdAS.MS_STATUS_TANAH_ID_DESKRIPSI },
                { k : 'Agunan Dihuni Oleh', v : $scope.fdAS.DB_PENGHUNI },
                { k : 'Dasar Penghunian', v : $scope.fdAS.DB_DASAR_PENGHUNIAN },
                { k : 'Jangka Waktu Sewa(Bulan)', v : $scope.fdAS.DB_WAKTU_SEWA },
                { k : 'Kapasitas Listrik(Watt)', v : $scope.fdAS.DB_LISTRIK },
                { k : 'Saluran Telepon', v : $scope.fdAS.DB_TELEPON },
                { k : 'Saluran Air', v : $scope.fdAS.MS_AIR_ID_DESKRIPSI },
                { k : 'Tersedia Angkutan Umum', v : $scope.fdAS.DB_ANGKUTAN_UMUM, t : 'yesorno', tv : 1 },
                { k : 'Tersedia Sekolah', v : $scope.fdAS.DB_SEKOLAH, t : 'yesorno', tv : 1 },
                { k : 'Tersedia Rumah Sakit', v : $scope.fdAS.DB_RUMAH_SAKIT, t : 'yesorno', tv : 1 },
                { k : 'Bangunan Didirikan Thn', v : $scope.fdAS.DB_TAHUN_BANGUNAN },
                { k : 'Renovasi Thn', v : $scope.fdAS.DB_TAHUN_RENOVASI },
                { k : 'Luas Bangunan Lt 1', v : $scope.fdAS.DB_LUAS_BANGUNAN },
                { k : 'Jalan Akses', v : $scope.fdAS.PR_NAMA_LENGKAP, t : 'yesorno', tv : 1 },
                { k : 'Jika Ada(Lebar Jalan)', v : $scope.fdAS.DB_LEBAR_JALAN },
                { k : 'Pondasi', v : $scope.fdAS.MS_PONDASI_ID_DESKRIPSI },
                { k : 'Lantai', v : $scope.fdAS.MS_LANTAI_ID_DESKRIPSI },
                { k : 'Dinding', v : $scope.fdAS.MS_DINDING_ID_DESKRIPSI },
                { k : 'Plafon', v : $scope.fdAS.MS_PLAFON_ID_ID_DESKRIPSI },
                { k : 'Kusen', v : $scope.fdAS.MS_KUSEN_ID_DESKRIPSI },
                { k : 'Atap', v : $scope.fdAS.MS_ATAP_ID_DESKRIPSI },
                { k : 'Pintu', v : $scope.fdAS.MS_PINTU_ID_DESKRIPSI },
                { k : 'Jendela', v : $scope.fdAS.MS_JENDELA_ID_DESKRIPSI },
                { k : 'Lantai 1', v : $scope.fdAS.DB_LANTAI_1 },
                { k : 'Lantai 2', v : $scope.fdAS.DB_LANTAI_2 },
                { k : 'Lantai 3', v : $scope.fdAS.DB_LANTAI_3 }
            ];
        });
    };
    
    $scope.getlistBTB = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'btb/get_list/?id='+id,
            scope   : $scope,
            sn      : 'listBTB',
            type    : 'tolist',
            callbacksuccess : function(){
                $scope.modalBTBList(id);
            }
        });
    };
    
    $scope.deleteBTB = function(d){
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Hapus',
            headerText: 'Hapus Data BTB',
            bodyText: 'Apakah anda yakin menghapus data BTB ini ?'
        }).then(function (result) {
            apiData.post({
                gl      : true,
                api     : apiBase+'btb/delete_by_id',
                data    : d,
                scope   : $scope,
                type    : 'tolist',
                callbacksuccess : function(){
                    apiData.get({
                        gl      : false,
                        api     : apiBase+'btb/get_list/?id='+$rootScope.AGUNAN_ID_SELECTED,
                        scope   : $scope,
                        sn      : 'listBTB',
                        type    : 'tolist'
                    });
                }
            });
        });
    };
			
    $scope.printBTB = function(id,info_id){
        $scope.URL = jasperBase+'BTB.pdf?INFORMASI_ID='+info_id+'&DB_INDIVIDU_AGUNAN_ID='+id;

        window.open($scope.URL, '_blank');
    };
    
    
	
})
.controller('modalFormAgunanCtrl',function($scope,apiData,apiBase,$stateParams, $rootScope,globalFunction){    
	
    apiData.get_masterData('jns_agunan');
    apiData.alamatExe($scope);
	
    apiData.kiosExe($scope); //FZL
	
//    if (!$scope.fdAS){
//	$scope.fdAS = {};
//        $rootScope.fdAS = {};
//    }
	
    $scope.jnsagunan='';/*FZL nambahin scope*/
    
    $scope.tabChange = function(t){
        $scope.tab = t;
    };
    
    $scope.detectJA = function(v){
        
        var R, JU = $rootScope.jns_agunan;
        
        console.log(JU);
        
        for (var i=0; i < JU.length; i++){
            if (JU[i].MS_PARA_GLOBAL_DETAIL_ID == v)
               R = JU[i].MS_DESKRIPSI; 
        }
        
		$scope.jnsagunan=R;/*FZL*/
		
        if ( R === 'TANAH' ){
            $scope.jao = 0;
            $scope.dtTTI = '';
        } else if ( R === 'TANAH DAN BANGUNAN' ) {
            $scope.jao = 1;
            // $scope.dtTTI = new Date();
		} else if ( R === 'KIOS' ) {	
			$scope.jao = 2;
        } else {
            $scope.jao = 99;
//            $location.url('/agunan/index');
        }
        
    };
    
//    $scope.fdAS = {};
    
    $scope.postAS = function(){
//        if ($scope.fdAS == undefined)
//            $scope.fdAS = {};

		if ($scope.formValid()){ /*FZL penambahan validasi*/
				$scope.fdAS.DB_PROSPEK_ID = $stateParams.id;
				apiData.post({
					gl      : true,
					api     : apiBase+'survey/post_agunan',
					data    : $scope.fdAS,
					scope   : $scope,
					type    : 'tolist',
					reloadp : { k : 'getlistAS', v : $stateParams.id },
					ag      : 'on-modal',
					cm      : 'closemodalAS'
				});
		};
    };
	
	
	/*FZL agunan 10/4/2018*/
	$scope.formValid = function(){	
			/*console.log($scope.jnsagunan);*/
			if ($scope.jnsagunan==='TANAH'){
				var e = globalFunction.formValidation({				
					scope : $scope,
					form  : 'fdAS',
					field : [
						{ fn : 'MS_BUKTI_KEPEMILIKAN_AGUNAN_ID',  fk : 'Bukti Kepemilikan Agunan' },
						{ fn : 'MS_PERUNTUKAN_LOKASI_ID',  fk : 'Peruntukan Lokasi' },
						{ fn : 'MS_JALAN_DILALUI_ID',  fk : 'Jalan Yang Dilalui' },
						{ fn : 'MS_BENTUK_TANAH_ID',  fk : 'Bentuk Tanah' },
						{ fn : 'DB_LUAS_TANAH',  fk : 'Luas Tanah' },
						{ fn : 'MS_KONDISI_PERMUKAAN_ID',  fk : 'Kondisi Permukaan Tanah' },
						{ fn : 'MS_PENGGUNAAN_TANAH_ID',  fk : 'Penggunaan Tanah' },
						{ fn : 'DB_BANJIR',  fk : 'Bahaya Banjir' },
						{ fn : 'MS_BATAS_UTARA_ID',  fk : 'Batas Utara' },
						{ fn : 'MS_BATAS_SELATAN_ID',  fk : 'Batas Selatan' },
						{ fn : 'MS_BATAS_BARAT_ID',  fk : 'Batas Barat' },
						{ fn : 'MS_BATAS_TIMUR_ID',  fk : 'Batas Timur' },
						{ fn : 'MS_STATUS_TANAH_ID',  fk : 'Status Tanah' },
                                                { fn : 'DB_JARAK_AGUNAN',  fk : 'Jarak Agunan' }
						]						
				});	
			} else if($scope.jnsagunan==='TANAH DAN BANGUNAN'){
				var e = globalFunction.formValidation({				
					scope : $scope,
					form  : 'fdAS',
					field : [
						{ fn : 'MS_BUKTI_KEPEMILIKAN_AGUNAN_ID',  fk : 'Bukti Kepemilikan Agunan' },
						{ fn : 'MS_PERUNTUKAN_LOKASI_ID',  fk : 'Peruntukan Lokasi' },
						{ fn : 'MS_JALAN_DILALUI_ID',  fk : 'Jalan Yang Dilalui' },
						{ fn : 'MS_BENTUK_TANAH_ID',  fk : 'Bentuk Tanah' },
						{ fn : 'DB_LUAS_TANAH',  fk : 'Luas Tanah' },
						{ fn : 'MS_KONDISI_PERMUKAAN_ID',  fk : 'Kondisi Permukaan Tanah' },
						{ fn : 'MS_PENGGUNAAN_TANAH_ID',  fk : 'Penggunaan Tanah' },
						{ fn : 'DB_BANJIR',  fk : 'Bahaya Banjir' },
						{ fn : 'MS_BATAS_UTARA_ID',  fk : 'Batas Utara' },
						{ fn : 'MS_BATAS_SELATAN_ID',  fk : 'Batas Selatan' },
						{ fn : 'MS_BATAS_BARAT_ID',  fk : 'Batas Barat' },
						{ fn : 'MS_BATAS_TIMUR_ID',  fk : 'Batas Timur' },
						{ fn : 'MS_STATUS_TANAH_ID',  fk : 'Status Tanah' },
						{ fn : 'DB_LISTRIK',  fk : 'Kapasitas Listrik(Watt)' },
						{ fn : 'DB_TELEPON_YN',  fk : 'Saluran Telepon' },
						{ fn : 'MS_AIR_ID',  fk : 'Saluran Air' },
						{ fn : 'DB_ANGKUTAN_UMUM',  fk : 'Tersedia Angkutan Umum' },
						{ fn : 'DB_SEKOLAH',  fk : 'Tersedia Sekolah' },
						{ fn : 'DB_RUMAH_SAKIT',  fk : 'Tersedia Rumah Sakit' },
						{ fn : 'MS_PONDASI_ID',  fk : 'Pondasi' },
						{ fn : 'MS_LANTAI_ID',  fk : 'Lantai' },
						{ fn : 'MS_DINDING_ID',  fk : 'Dinding' },
						{ fn : 'MS_PLAFON_ID',  fk : 'Plafon' },
						{ fn : 'MS_KUSEN_ID',  fk : 'Kusen' },
						{ fn : 'MS_ATAP_ID',  fk : 'Atap' },
						{ fn : 'MS_PINTU_ID',  fk : 'Pintu' },
						{ fn : 'MS_JENDELA_ID',  fk : 'Jendela' },
                                                { fn : 'DB_JARAK_AGUNAN',  fk : 'Jarak Agunan' }
						]
				});	
			} else if($scope.jnsagunan==='KIOS'){
				var e = globalFunction.formValidation({				
					scope : $scope,
					form  : 'fdAS',
					field : [
						{ fn : 'MS_JENIS_AGUNAN_ID',  fk : 'Jenis Agunan' },
						{ fn : 'MS_STATUS_KEPEMILIKAN_ID',  fk : 'Status Kepemilikan' },
//						{ fn : 'MS_LEGALITAS_JAMINAN_ID',  fk : 'Legalitas Jaminan' },
//						{ fn : 'MS_DETAIL_LEGALITAS_JAMINAN_ID',  fk : 'Detail Legalitas Jaminan' },
						{ fn : 'MS_STATUS_KIOS_ID',  fk : 'Status Kios' },
						{ fn : 'MS_JENIS_KIOS_ID',  fk : 'Jenis Kios' },
						
						{ fn : 'MS_BATAS_UTARA_ID',  fk : 'Batas Utara' },
						{ fn : 'MS_BATAS_SELATAN_ID',  fk : 'Batas Selatan' },
						{ fn : 'MS_BATAS_BARAT_ID',  fk : 'Batas Barat' },
						{ fn : 'MS_BATAS_TIMUR_ID',  fk : 'Batas Timur' },
						
						{ fn : 'DB_ALAMAT',  fk : 'Alamat' },
						{ fn : 'DB_RT',  fk : 'RT' },
						{ fn : 'DB_RW',  fk : 'RW' },
						{ fn : 'MS_PROVINSI_ID',  fk : 'Provinsi' },
						{ fn : 'MS_KODE_POS_ID',  fk : 'Kode Pos' },
						{ fn : 'MS_PERUNTUKAN_LOKASI_ID',  fk : 'Peruntukan Lokasi' },
						{ fn : 'MS_JALAN_DILALUI_ID',  fk : 'Jalan dilalui' },
						
						{ fn : 'DB_LUAS_BANGUNAN',  fk : 'Luas Bangunan' },
						{ fn : 'DB_TAHUN_BANGUNAN',  fk : 'Tahun Bangunan' },
						{ fn : 'DB_BANJIR',  fk : 'Bahaya banjir' }						
						]
				});																
			} else {
				var e = globalFunction.formValidation({				
					scope : $scope,
					form  : 'fdAS',
					field : [
						{ fn : 'MS_JENIS_AGUNAN_ID',  fk : 'Jenis Agunan' },
						{ fn : 'MS_STATUS_KEPEMILIKAN_ID',  fk : 'Status Kepemilikan' }
					]
				});
			};
        return e;
    };
    
    $scope.$watch('fdAS.MS_JENIS_AGUNAN_ID', function(dataLoaded) {
        if (dataLoaded) {
            if ($scope.fdAS.MS_JENIS_AGUNAN_ID)
                $scope.detectJA($scope.fdAS.MS_JENIS_AGUNAN_ID);
        }
    });
    
//    $scope.$watch('fdAS.DB_LEBAR_JALAN', function(dataLoaded){
//        if (dataLoaded) {
//            if ($scope.fdAS.DB_LEBAR_JALAN)
//                $scope.fdAS.jalan_akses = 0;
//            else
//                $scope.fdAS.jalan_akses = 1;
//        }
//        
//    });
    
    $scope.$watchGroup(['DS','fdAS.MS_STATUS_KEPEMILIKAN_ID'], function(dataLoaded) {
        if (dataLoaded) {
            if ($scope.fdAS.MS_STATUS_KEPEMILIKAN_ID == 229){
                $scope.fdAS.DB_NAMA_PEMILIK = $scope.DS.PROFIL.PROFIL_PROSPEK.PR_NAMA_LENGKAP;
                $scope.fdAS.MS_HUBUNGAN_PEMOHON_ID = '';
            } else {
                $scope.fdAS.DB_NAMA_PEMILIK = '';
                $scope.KEYUP_NAMA_PEMILIK();
            }
        }
    });	
	
    $scope.$watchGroup(['fdAS.PR_LAMA_MENEMPATI_TAHUN','fdAS.PR_LAMA_MENEMPATI_BULAN'],function(nV){
		if (nV){
			$scope.fdAS.DB_WAKTU_SEWA = parseInt( $scope.fdAS.PR_LAMA_MENEMPATI_TAHUN * 12 ) + parseInt($scope.fdAS.PR_LAMA_MENEMPATI_BULAN);
		}
	});
	
//    $scope.$watchGroup(['fdAS.MS_LEGALITAS_JAMINAN_ID'], function(newValue,oldValue) {
//        if(newValue) {    
//            apiData.kiosExe($scope);                    
//            $scope.dlj($scope.fdAS.MS_LEGALITAS_JAMINAN_ID); 
//        }
//    });	
    
    
    
})
.controller('asListPenilaianModalCtrl',function(modalService,$scope,globalFunction,$rootScope,$stateParams,apiData,apiBase,getNilaiPasarValidator){
	
    $rootScope.AGUNAN_ID_SELECTED_ALL = 0;/*FZL 18/4/2018*/
    
    $scope.modalPNL = function(id){
        if (id){
            $rootScope.AGUNAN_ID_SELECTED = id;	
            getNilaiPasarValidator.e($rootScope,'fdPNL',$rootScope.AGUNAN_ID_SELECTED);
        }
        
        var m = globalFunction.openModal('partials/modals/modal-survey-penilaian.html','modal-survey-penilaian modal-form','asPenilaianModalCtrl');
        
        $rootScope.closemodalPNL = function(){
            m.close();
        };
        
    };

    $rootScope.getlistPNL = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_penilaianlist/?id='+id,
            scope   : $scope,
            sn      : 'listPNL',
            type    : 'tolist',
                callbacksuccess : function(R){
                    console.log(R.data);				
                    $rootScope.AGUNAN_ID_SELECTED_ALL = R.data;

                    $scope.TotalPenilaian = function(){ //FZL
                            var total = 0;
                            var penilaian = 0;
                            for(var i = 0; i < R.data.length; i++){
                                    penilaian = parseInt(R.data[i].DB_NILAI_PASAR);
                                    total = total+penilaian;
                            }
                            return total;
                    };
					
            }
        });
    };
    $scope.getlistPNL($rootScope.AGUNAN_ID_SELECTED);

    $scope.editPNL = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'survey/get_penilaianid/?id='+id,
            scope   : $rootScope,
            sn      : 'fdPNL',
            setdate : [{ k : 'dtTPNL', v : 'DB_TGL_PENILAIAN' }],
            callbacksuccess : function(R){
                if ($scope.fdPNL.NILAI_PASAR_OVERWRITE == null)
                    $scope.fdPNL.NILAI_PASAR_OVERWRITE = 0;
                
                $scope.fdPNL.DB_NILAI_PASAR_1_PER_METER_PERSEGI = ( $scope.fdPNL.DB_NILAI_PASAR_1 / $scope.fdPNL.DB_LUAS_TANAH_PER_METER_PERSEGI );
                $scope.fdPNL.DB_NILAI_PASAR_2_PER_METER_PERSEGI = ( $scope.fdPNL.DB_NILAI_PASAR_2 / $scope.fdPNL.DB_LUAS_TANAH_PER_METER_PERSEGI );
                $scope.fdPNL.DB_NILAI_PASAR_3_PER_METER_PERSEGI = ( $scope.fdPNL.DB_NILAI_PASAR_3 / $scope.fdPNL.DB_LUAS_TANAH_PER_METER_PERSEGI );
                $scope.fdPNL.DB_NILAI_PASAR_PER_METER_PERSEGI = ( $scope.fdPNL.DB_NILAI_PASAR / $scope.fdPNL.DB_LUAS_TANAH_PER_METER_PERSEGI );
            }
        });
        $scope.modalPNL();
    };

    $scope.deletePNL = function(d){
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Hapus',
            headerText: 'Hapus Penilaian Agunan',
            bodyText: 'Apakah anda yakin menghapus data hasil penilaian agunan ini ?'
        }).then(function (result) {
            apiData.post({
                gl      : true,
                api     : apiBase+'survey/delete_penilaian',
                data    : d,
                scope   : $scope,
                type    : 'tolist',
                ag      : 'on-modal',
                reloadp : { k : 'getlistPNL', v : $rootScope.AGUNAN_ID_SELECTED }
            });
        });
    };
    
    $scope.viewPNL = function(id){
        apiData.get_view({
            gl      : true,
            api     : apiBase+'survey/get_penilaianid/?id='+id,
            scope   : $scope,
            fd      : 'fdPNL',
            title   : 'Agunan - Penilaian'
        });
        $scope.$watch('fdPNL',function(){
            $rootScope.ROW_VIEW = [
//                { k : 'Id', v : $scope.fdPNL.DB_INDIVIDU_NILAI_AGUNAN_ID },
                { k : 'Jenis Penilaian', v : $scope.fdPNL.MS_JENIS_PENILAIAN },
                { k : 'Penilaian Tanah ID', v : $scope.fdPNL.DB_NILAI_PARENT },
                { k : 'Status Penilaian', v : $scope.fdPNL.MS_STATUS_PENILAIAN },
                { k : 'Tgl Penilaian', v : $scope.fdPNL.DB_TGL_PENILAIAN },
                { k : 'Nama Penilai', v : $scope.fdPNL.DB_NAMA_PENILAI },
                { k : 'Jabatan', v : $scope.fdPNL.DB_JABATAN },
                { k : 'Luas Tanah', v : $scope.fdPNL.DB_LUAS_TANAH_PER_METER_PERSEGI, t : 'number' },
                { k : 'Nilai Pasar (DNPT)', v : $scope.fdPNL.NILAI_PASAR_VALIDATOR, t : 'number' },
                { k : 'Nilai Pasar 1(Sesuai NJOP)', v : $scope.fdPNL.DB_NILAI_PASAR_1, t : 'number' },
                { k : 'Nilai Pasar 2', v : $scope.fdPNL.DB_NILAI_PASAR_2, t : 'number' },
                { k : 'Nilai Pasar 3', v : $scope.fdPNL.DB_NILAI_PASAR_3, t : 'number' },
                { k : 'Nilai Pasar', v : $scope.fdPNL.DB_NILAI_PASAR, t : 'number' },
                { k : 'Presentase Likuidasi', v : $scope.fdPNL.DB_PERSENTASE_LIKUIDASI, t : 'percent' },
                { k : 'Nilai Likuidasi', v : $scope.fdPNL.DB_NILAI_LIKUIDASI, t : 'number' }
            ];
        });
    };
    
})
.controller('asPenilaianModalCtrl',function($scope,$rootScope,apiData,apiBase,globalFunction,$http){
    
    $scope.$watchGroup(['fdPNL.DB_NILAI_PASAR','fdPNL.DB_PERSENTASE_LIKUIDASI'],function(dataLoaded){
        if (dataLoaded){
            $scope.fdPNL.DB_NILAI_LIKUIDASI = ($scope.fdPNL.DB_NILAI_PASAR * $scope.fdPNL.DB_PERSENTASE_LIKUIDASI) / 100;
        }
    });
        
    $scope.postPNL = function(){		
        if ($scope.fdPNL == undefined)
            $scope.fdPNL = {};
        $scope.fdPNL.DB_INDIVIDU_AGUNAN_ID  = $rootScope.AGUNAN_ID_SELECTED;
        
        if ($scope.fdPNL.MS_JENIS_PENILAIAN == 1134)
            $scope.fdPNL.NILAI_PASAR_VALIDATOR = $scope.fdPNL.NILAI_PASAR_VALIDATOR_MASTER;
        else
            $scope.fdPNL.NILAI_PASAR_VALIDATOR = 0;
		
        if ($rootScope.jenis_agunan_id == 58)
            $scope.fdPNL.MS_JENIS_PENILAIAN = 1134;
        
        console.log($scope.fdPNL);

        if ($scope.formValid()){	/*FZL penambahan validasi*/
            apiData.post({
                gl      : true,
                api     : apiBase+'survey/post_penilaian',
                data    : $scope.fdPNL,
                scope   : $scope,
                type    : 'tolist',
                reloadp : { k : 'getlistPNL', v : $rootScope.AGUNAN_ID_SELECTED },
                ag      : 'on-modal',
                cm      : 'closemodalPNL'
            });
        };
    };
		
    /*FZL 10/4/2018*/	
    $scope.formValid = function(){		
        if ($rootScope.jenis_agunan_id===59 && $scope.fdPNL.MS_JENIS_PENILAIAN == 1134){
            var e = globalFunction.formValidation({
                scope : $scope,
                form  : 'fdPNL',			
                field : [
                        { fn : 'MS_JENIS_PENILAIAN',  fk : 'Jenis Penilaian' },
                        { fn : 'DB_NILAI_PASAR_1',  fk : 'Nilai Pasar 1' },
                        { fn : 'DB_NILAI_PASAR_2',  fk : 'Nilai Pasar 2' },
                        { fn : 'DB_NILAI_PASAR_3',  fk : 'Nilai Pasar 3' },
                        { fn : 'DB_NILAI_PASAR',  fk : 'Nilai Pasar' },
                        { fn : 'DB_PERSENTASE_LIKUIDASI',  fk : 'Presentase Likuidasi' },
                        { fn : 'DB_NILAI_LIKUIDASI',  fk : 'Nilai Likuidasi' },
                        { fn : 'DB_LUAS_TANAH_PER_METER_PERSEGI',  fk : 'Luas Tanah' },
                        /*{ fn : 'NILAI_PASAR_VALIDATOR',  fk : 'Nilai Pasar Tanah (DNPT)' }*/
                ]
            });
        } else {
            var e = globalFunction.formValidation({
                scope : $scope,
                form  : 'fdPNL',			
                field : [
                        { fn : 'DB_NILAI_PASAR_1',  fk : 'Nilai Pasar 1' },
                        { fn : 'DB_NILAI_PASAR_2',  fk : 'Nilai Pasar 2' },
                        { fn : 'DB_NILAI_PASAR_3',  fk : 'Nilai Pasar 3' },
                        { fn : 'DB_NILAI_PASAR',  fk : 'Nilai Pasar' },
                        { fn : 'DB_PERSENTASE_LIKUIDASI',  fk : 'Presentase Likuidasi' },
                        { fn : 'DB_NILAI_LIKUIDASI',  fk : 'Nilai Likuidasi' }
                ]
            });
        }
        return e;
    };
    /*
    $scope.cekNilaiPasar = function() {
        if ($scope.fdPNL.MS_JENIS_PENILAIAN == 1134 && $scope.fdPNL.NILAI_PASAR_OVERWRITE == 0){
            if ($scope.fdPNL.DB_NILAI_PASAR > $scope.fdPNL.NILAI_PASAR_VALIDATOR_MASTER_PER_METER_2) {
                globalFunction.ag('danger',['Nilai Pasar tidak boleh kecil dari DNPT']);
                $scope.fdPNL.DB_NILAI_PASAR = $scope.fdPNL.NILAI_PASAR_VALIDATOR_MASTER_PER_METER_2;
               
                $scope.fdPNL.DB_NILAI_PASAR_PER_METER_PERSEGI = ( $scope.fdPNL.DB_NILAI_PASAR / $scope.fdPNL.DB_LUAS_TANAH_PER_METER_PERSEGI );
            }
        }
    };
    $scope.cekNilaiPasar1 = function() {
        if ($scope.fdPNL.MS_JENIS_PENILAIAN == 1134 && $scope.fdPNL.NILAI_PASAR_OVERWRITE == 0){
            if ($scope.fdPNL.DB_NILAI_PASAR_1 > $scope.fdPNL.NILAI_PASAR_VALIDATOR_MASTER_PER_METER_2) {
                globalFunction.ag('danger',['Nilai Pasar 1 tidak boleh kecil dari DNPT']);
                $scope.fdPNL.DB_NILAI_PASAR_1 = $scope.fdPNL.NILAI_PASAR_VALIDATOR_MASTER_PER_METER_2;
                $scope.fdPNL.DB_NILAI_PASAR_1_PER_METER_PERSEGI = ( $scope.fdPNL.DB_NILAI_PASAR_1 / $scope.fdPNL.DB_LUAS_TANAH_PER_METER_PERSEGI );
                
            }
        }
    };
    $scope.cekNilaiPasar2 = function() {
        if ($scope.fdPNL.MS_JENIS_PENILAIAN == 1134 && $scope.fdPNL.NILAI_PASAR_OVERWRITE == 0){
            if ($scope.fdPNL.DB_NILAI_PASAR_2 > $scope.fdPNL.NILAI_PASAR_VALIDATOR_MASTER_PER_METER_2) {
                globalFunction.ag('danger',['Nilai Pasar 2 tidak boleh kecil dari DNPT']);
                $scope.fdPNL.DB_NILAI_PASAR_2 = $scope.fdPNL.NILAI_PASAR_VALIDATOR_MASTER_PER_METER_2;
                $scope.fdPNL.DB_NILAI_PASAR_2_PER_METER_PERSEGI = ( $scope.fdPNL.DB_NILAI_PASAR_2 / $scope.fdPNL.DB_LUAS_TANAH_PER_METER_PERSEGI );
                
            }
        }
    };
    $scope.cekNilaiPasar3 = function() {
        if ($scope.fdPNL.MS_JENIS_PENILAIAN == 1134 && $scope.fdPNL.NILAI_PASAR_OVERWRITE == 0){
            if ($scope.fdPNL.DB_NILAI_PASAR_3 > $scope.fdPNL.NILAI_PASAR_VALIDATOR_MASTER_PER_METER_2) {
                globalFunction.ag('danger',['Nilai Pasar 3 tidak boleh kecil dari DNPT']);
                $scope.fdPNL.DB_NILAI_PASAR_3 = $scope.fdPNL.NILAI_PASAR_VALIDATOR_MASTER_PER_METER_2;
                $scope.fdPNL.DB_NILAI_PASAR_3_PER_METER_PERSEGI = ( $scope.fdPNL.DB_NILAI_PASAR_3 / $scope.fdPNL.DB_LUAS_TANAH_PER_METER_PERSEGI );
            }
        }
    };
    */
    $scope.$watchGroup(['fdPNL.DB_LUAS_TANAH_PER_METER_PERSEGI'],function(dataLoaded){
        if (dataLoaded){
           $scope.fdPNL.NILAI_PASAR_VALIDATOR_MASTER_PER_METER_2  = ($scope.fdPNL.DB_LUAS_TANAH_PER_METER_PERSEGI * $scope.fdPNL.NILAI_PASAR_VALIDATOR_MASTER);
        }
    });
    
    $scope.$watchGroup([
        'fdPNL.DB_LUAS_TANAH_PER_METER_PERSEGI',
        'fdPNL.DB_NILAI_PASAR_1_PER_METER_PERSEGI',
        'fdPNL.DB_NILAI_PASAR_2_PER_METER_PERSEGI',
        'fdPNL.DB_NILAI_PASAR_3_PER_METER_PERSEGI',
        'fdPNL.DB_NILAI_PASAR_PER_METER_PERSEGI'
    ],function(dataLoaded){
        if (dataLoaded){
           $scope.fdPNL.DB_NILAI_PASAR_1  = ($scope.fdPNL.DB_LUAS_TANAH_PER_METER_PERSEGI * $scope.fdPNL.DB_NILAI_PASAR_1_PER_METER_PERSEGI);
           $scope.fdPNL.DB_NILAI_PASAR_2  = ($scope.fdPNL.DB_LUAS_TANAH_PER_METER_PERSEGI * $scope.fdPNL.DB_NILAI_PASAR_2_PER_METER_PERSEGI);
           $scope.fdPNL.DB_NILAI_PASAR_3  = ($scope.fdPNL.DB_LUAS_TANAH_PER_METER_PERSEGI * $scope.fdPNL.DB_NILAI_PASAR_3_PER_METER_PERSEGI);
           $scope.fdPNL.DB_NILAI_PASAR  = ($scope.fdPNL.DB_LUAS_TANAH_PER_METER_PERSEGI * $scope.fdPNL.DB_NILAI_PASAR_PER_METER_PERSEGI);
        }
    });
    
})
.controller('dokumenAgunanCtrl',function(modalService,$scope,apiData,apiBase,$stateParams,postDOC,$rootScope){
    
    $scope.fdDAS = {};
    
    $scope.postDAS = function(){
        $scope.fdDAS.DB_PROSPEK_ID = $stateParams.id;
        $scope.fdDAS.DB_HEADER = 'AGUNAN';
        postDOC.e($scope.fdDAS,$scope,function(){
            $scope.fdDAS.PR_DOKUMEN = null;
        });
    };

    $scope.getlistDAS = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_dokumenlist/?id='+id+'&header=AGUNAN',
            scope   : $scope,
            sn      : 'listDAS',
            type    : 'tolist'
        });
    };
    $scope.getlistDAS($stateParams.id);

    $scope.editDAS = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'prospek/get_dokumenid/?id='+id,
            scope   : $scope,
            sn      : 'fdDAS'
        });
    };

    $scope.deleteDAS = function(d){
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Hapus',
            headerText: 'Hapus Dokumen Agunan',
            bodyText: 'Apakah anda yakin menghapus dokumen agunan ini ?'
        }).then(function (result) {
            apiData.post({
                gl      : true,
                api     : apiBase+'prospek/delete_dokumen',
                data    : d,
                scope   : $scope,
                type    : 'tolist',
                reload  : 'getlistDAS'
            });
        });
    };
    
    $scope.viewDAS = function(id){
        apiData.get_view({
            gl      : true,
            api     : apiBase+'prospek/get_dokumenid/?id='+id,
            scope   : $scope,
            fd      : 'fdDAS',
            title   : 'Agunan - Dokumen'
        });
        $scope.$watch('fdDAS',function(){
            $scope.setdataAgunan($scope.fdDAS.DB_HEADER_ID);
            $rootScope.ROW_VIEW = [
//                { k : 'Id', v : $scope.fdDAS.PR_INDIVIDU_DOKUMEN_ID },
                { k : 'Agunan', v : $scope.fdDAS.MS_JENIS_AGUNAN_ID_DESKRIPSI },
                { k : 'Nomor Kepemilikan / Sertifikat', v : $scope.fdDAS.PR_NOMOR_DOKUMEN },
                { k : 'Jenis Dokumen', v : $scope.fdDAS.MS_JENIS_DOKUMEN },
                { k : 'Pemilik Dokumen', v : $scope.fdDAS.MS_PEMILIK_DOKUMEN },
                { k : 'File', v : $scope.fdDAS.NODE_ID, t : 'file', d : $scope.fdDAS.PR_PATH_DOKUMEN }
            ];
        });
    };
    
    $scope.getlistAgunan = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'survey/get_agunanlist/?id='+id,
            scope   : $scope,
            sn      : 'listAgunan',
            type    : 'tolist'
        });
    };
    $scope.getlistAgunan($stateParams.id);
    
    $scope.setdataAgunan = function(id){
        for (var i=0; i<$scope.listAgunan.length; i++){
            if ($scope.listAgunan[i].DB_INDIVIDU_AGUNAN_ID == id){
//                $scope.fdDAS.PR_NOMOR_DOKUMEN = $scope.listAgunan[i].DB_NOMOR_SURAT_TANAH;
                $scope.fdDAS.MS_JENIS_AGUNAN_ID_DESKRIPSI = $scope.listAgunan[i].MS_JENIS_AGUNAN_ID_DESKRIPSI;
            } 
        }
    };
    
    $scope.resetfdDAS = function () {
        $scope.fdDAS = {};
    };
})
.controller('exsumAgunanCtrl',function($scope,apiData,apiBase,globalFunction,$stateParams){
    
    $scope.fdEA = {};
    
    $scope.postEA = function(){
        $scope.fdEA.DB_PROSPEK_ID = $stateParams.id;
        apiData.post({
            gl      : true,
            api     : apiBase+'survey/post_alldata',
            data    : $scope.fdEA,
            scope   : $scope,
            type    : 'tolist',
            callbacksuccess : function(){
                for (var k in $scope.fdEA){
                    if ($scope.DS.AGUNAN.MS_EXSUM_AGUNAN.hasOwnProperty(k)) {
                        $scope.DS.AGUNAN.MS_EXSUM_AGUNAN[k] = $scope.fdEA[k];
                    }
                }
            }
        });
    };
    
//    apiData.get_DS();
    
    $scope.$watch('DS', function(dataLoaded) {
        if (dataLoaded) {
            $scope.fdEA = globalFunction.collectObject($scope.DS.AGUNAN.MS_EXSUM_AGUNAN);
        }
    });
    
});

App.controller('fkNoteCtrl', function(modalService,$scope,$rootScope,globalFunction,apiData,apiBase,$stateParams){
    
    $scope.modalCT = function(){
        
        var m = globalFunction.openModal('partials/modals/modal-catatan.html','modal-catatan modal-form','formFkNoteCtrl');
        
        $rootScope.closemodalCT = function(){
            m.close();
        };
        
    };
    
    $rootScope.getlistNTE = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_notelist/?id='+id,
            scope   : $rootScope,
            sn      : 'listNTE',
            type    : 'tolist'
        });
    };
    $rootScope.getlistNTE($stateParams.id);

    $scope.editNTE = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'survey/get_noteid/?id='+id,
            scope   : $rootScope,
            sn      : 'fdNTE'
        });
        $scope.modalCT();
    };

    $scope.deleteNTE = function(d){
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Hapus',
            headerText: 'Hapus Faktor Kualitatif',
            bodyText: 'Apakah anda yakin menghapus data faktor kualitatif ini ?'
        }).then(function (result) {
            apiData.post({
                gl      : true,
                api     : apiBase+'survey/delete_note',
                data    : d,
                scope   : $scope,
                type    : 'tolist',
                reloadp : { k : 'getlistNTE', v : $stateParams.id }
            });
        });
    };
    
    $scope.viewNTE = function(id){
        apiData.get_view({
            gl      : true,
            api     : apiBase+'survey/get_noteid/?id='+id,
            scope   : $scope,
            fd      : 'fdNTE',
            title   : 'Faktor Kualitatif'
        });
        $scope.$watch('fdNTE',function(){
            $rootScope.ROW_VIEW = [
//                { k : 'Id', v : $scope.fdNTE.SV_INDIVIDU_NOTE_ID },
                { k : 'Pemberi Catatan', v : $scope.fdNTE.SV_PEMBERI_NOTE },
                { k : 'Jenis Catatan', v : $scope.fdNTE.MS_JENIS_CATATAN },
                { k : 'Keterangan', v : $scope.fdNTE.SV_NOTE }
            ];
        });
    };
    
})
.controller('formFkNoteCtrl',function($scope,apiData,apiBase,$stateParams){
    
    $scope.postNTE = function(){
        $scope.fdNTE.DB_PROSPEK_ID = $stateParams.id;
        apiData.post({
            gl      : true,
            api     : apiBase+'survey/post_note',
            data    : $scope.fdNTE,
            scope   : $scope,
            fd      : 'fdNTE',
            type    : 'tolist',
            reloadp : { k : 'getlistNTE', v : $stateParams.id },
            ag      : 'on-modal',
            cm      : 'closemodalCT'
        });
    };

});

/* Penjamin */

App.controller('penjaminCtrl',function($scope,$stateParams,apiData,apiBase,globalFunction){
    
    $scope.fdPJ = {};	
    
    $scope.postPJ = function(){
		if ($scope.formValid()){ /*FZL penambahan validasi 12/4/2018*/
			$scope.fdPJ.DB_PROSPEK_ID = $stateParams.id;
			apiData.post({
				gl      : true,
				api     : apiBase+'survey/post_alldata',
				data    : $scope.fdPJ,
				scope   : $scope,
				type    : 'tolist'
			});
		};
    };
	
	/*FZL penambahan validasi 12/4/2018*/
	$scope.formValid = function(){
        var e = globalFunction.formValidation({
            scope : $scope,
            form  : 'fdPJ',
            field : [
                { fn : 'PENJAMIN_NIK',  fk : 'NIK' },
                { fn : 'PENJAMIN_NAMA',  fk : 'Nama' },
                { fn : 'PENJAMIN_TEMPAT_LAHIR',  fk : 'Tempat Lahir' },
                /*{ fn : 'PENJAMIN_TANGGAL_LAHIR',  fk : 'Tanggal Lahir' },*/
                { fn : 'PENJAMIN_ALAMAT',  fk : 'Alamat' },
                { fn : 'PENJAMIN_JENIS_KELAMIN_ID',  fk : 'Jenis Kelamin' },
                { fn : 'PENJAMIN_PENDIDIKAN_ID',  fk : 'Pendidikan' },
                { fn : 'PENJAMIN_NPWP',  fk : 'NPWP' },
                { fn : 'PENJAMIN_NO_HP',  fk : 'Nomor Handphone' }
            ]
        });
        return e;
    };
	
    
    $scope.getPJ = function(){
        $scope.fdPJ.DB_PROSPEK_ID = $stateParams.id;
        apiData.get({
            gl      : true,
            api     : apiBase+'survey/get_penjaminid?id='+$scope.fdPJ.DB_PROSPEK_ID,
            scope   : $scope,
            sn      : 'fdPJ',
            setdate : [
                        { k : 'dtPJTL', v : 'PENJAMIN_TANGGAL_LAHIR' }
                    ]
        });
    };
    $scope.getPJ();
    
});



/* Prospek Dokumen */

App.controller('dokumenSurveyCtrl', function(modalService,$scope,$stateParams,apiData,globalFunction,$http,apiBase,$stateParams,postDokumen,getKelengkapanDataById,$rootScope) {
    
    apiData.get_allDataCalonDebiturPerId($scope,$stateParams.id);

    $scope.formDataSurveyDokumen = {};

    $scope.processFormFoto = function() {
		if ($scope.formValid()){
			globalFunction.openModalLoading();
			$scope.formDataSurveyDokumen.DB_PROSPEK_ID = $stateParams.id;
            $scope.formDataSurveyDokumen.DB_HEADER = 'FOTO';
            $scope.formDataSurveyDokumen.DB_HEADER_ID = '';
			$scope.formDataSurveyDokumen.TYPE_DOKUMEN = 'FOTO';
			var data = $scope.formDataSurveyDokumen;    
			console.log(data);
			postDokumen.uploadFileToUrl(data,$scope,function(R){
				$scope.formDataSurveyDokumen.PR_DOKUMEN = null;
			});										
		};			
    };

	/*FZL tambah validasi*/
	$scope.formValid = function(){
        var e = globalFunction.formValidation({
            scope : $scope,
            form  : 'formDataSurveyDokumen',
            field : [
                { fn : 'MS_JENIS_DOKUMEN_ID',  fk : 'Jenis Dokumen' },
                { fn : 'PR_NOMOR_DOKUMEN',  fk : 'Nomor Dokumen' },
                { fn : 'PR_DOKUMEN',  fk : 'Upload File Dokumen' }                
            ]
        });
        return e;
    };	
    
    $scope.getDokumenListFoto = function(id){
        
        $http({
            method  : "GET",
            url     : apiBase + 'survey/get_dokumenlist/?id='+id+'&header=FOTO',
            dataType: 'json',
            headers : { 'Content-Type':'application/json' },
        }).then(function mySuccess(R) {
            console.log(R);
            $scope.dokumenList = (typeof R.data !== 'undefined') ? R.data : [];

        }, function myError(R) { 
            console.log(R.statusText); 
            globalFunction.ag('danger',[R]); 
        });
    };
    $scope.getDokumenListFoto($stateParams.id);
    
    $scope.editDokumenFoto = function(id){
        globalFunction.openModalLoading();
        $http({
            method : "GET",
            url : apiBase + 'prospek/get_dokumenid/?id='+id,
            dataType: 'json',
            headers: { 'Content-Type':'application/json' }
        }).then(function mySuccess(R) {
            $scope.formDataSurveyDokumen = (typeof R.data !== 'undefined') ? R.data[0] : [];
            console.log(R);
			console.log($scope.formDataSurveyDokumen.MS_JENIS_DOKUMEN_ID);
            globalFunction.closeModalLoading();
        }, function myError(R) { 
            console.log(R.statusText);
            globalFunction.ag('danger',[R]); 
            globalFunction.closeModalLoading();
        });
    };
    
    $scope.deleteDokumenFoto = function(data){
        
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Hapus',
            headerText: 'Hapus Dokumen',
            bodyText: 'Apakah anda yakin menghapus dokumen ini ?'
        }).then(function (result) {
            
            globalFunction.openModalLoading();
            $http({
                method: 'POST',
                url: apiBase + 'prospek/delete_dokumen',
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data: globalFunction.serializeObj(data)
            }).then(function(R){
                if (R.status == '200' && typeof R.data.status && R.data.status == 'Success') {
                    globalFunction.ag('success',['Data berhasil dihapus']);
                    $scope.getDokumenListFoto($stateParams.id);
                    getKelengkapanDataById.e({
                            scope   : $rootScope,
                            id      : $stateParams.id,
                            type    : 'survey'
                        });
                } else {
                    globalFunction.ag('danger',['Data gagal dihapus']);
                }
                console.log(R);
                globalFunction.closeModalLoading();
            }, function myError(R){ 
                console.log(R.statusText); 
                globalFunction.ag('danger',[R]); 
                globalFunction.closeModalLoading();
            });
            
        });
        
        
    };
    
    $scope.viewDokumenFoto = function(id){
        apiData.get_view({
            gl      : true,
            api     : apiBase + 'prospek/get_dokumenid/?id='+id,
            scope   : $scope,
            fd      : 'formDataSurveyDokumen',
            title   : 'View Dokumen'
        });
        $scope.$watch('formDataSurveyDokumen',function(){
            $rootScope.ROW_VIEW = [
                // { k : 'Id', v : $scope.formDataSurveyDokumen.PR_INDIVIDU_DOKUMEN_ID },
                { k : 'Jenis Dokumen', v : $scope.formDataSurveyDokumen.MS_JENIS_DOKUMEN },
                { k : 'Nomor Dokumen', v : $scope.formDataSurveyDokumen.PR_NOMOR_DOKUMEN },
                { k : 'File', v : $scope.formDataSurveyDokumen.NODE_ID, t : 'file', d : $scope.formDataSurveyDokumen.PR_PATH_DOKUMEN }
            ];
        });
    };
    
    $scope.resetFormDataFoto = function(e){
        $scope.formDataSurveyDokumen = {};
        $scope.formDataSurveyDokumen.PR_DOKUMEN = null;
    };
    
});

App.controller('deviasiCtrl',function($scope,globalFunction,apiData,apiBase,$stateParams,modalService,$rootScope){
    
    $scope.fdDV = {};
    
    $scope.modalDV = function(t){
        
        if (t == 'N')
            $scope.fdDV = {};
        
        var m = globalFunction.openModal('partials/modals/modal-deviasi.html','modal-deviasi modal-form','formDeviasiCtrl',$scope);
        
        $rootScope.closemodalDV = function(){
            m.close();
        };
        
    };
    
    $scope.getlistDV = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'survey/get_deviasilist/?id='+id,
            scope   : $scope,
            sn      : 'listDV',
            type    : 'tolist'
        });
    };
    $scope.getlistDV($stateParams.id);

    $scope.editDV = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'survey/get_deviasiid/?id='+id,
            scope   : $scope,
            sn      : 'fdDV'
        });
        $scope.modalDV();
    };

    $scope.deleteDV = function(d){
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Hapus',
            headerText: 'Hapus Deviasi',
            bodyText: 'Apakah anda yakin menghapus data deviasi ini ?'
        }).then(function (result) {
            apiData.post({
                gl      : true,
                api     : apiBase+'survey/delete_deviasi',
                data    : d,
                scope   : $scope,
                type    : 'tolist',
                reloadp : { k : 'getlistDV', v : $stateParams.id }
            });
        });
    };
    
    $scope.viewDV = function(id){
        apiData.get_view({
            gl      : true,
            api     : apiBase+'survey/get_deviasiid/?id='+id,
            scope   : $scope,
            fd      : 'fdDV',
            title   : 'Deviasi'
        });
        $scope.$watch('fdDV',function(){
            $rootScope.ROW_VIEW = [
                { k : 'Jenis Deviasi', v : $scope.fdDV.MS_JENIS_DEVIASI_ID_DESKRIPSI },
                { k : 'Keterangan', v : $scope.fdDV.SV_KETERANGAN_DEVIASI, t : 'html' }
            ];
        });
    };
    
})
.controller('formDeviasiCtrl',function($scope,$stateParams,apiData,apiBase){
    
    $scope.postDV = function(){
        $scope.fdDV.DB_PROSPEK_ID = $stateParams.id;
        apiData.post({
            gl      : true,
            api     : apiBase+'survey/post_deviasi',
            data    : $scope.fdDV,
            scope   : $scope,
            fd      : 'fdDV',
            type    : 'tolist',
            reloadp : { k : 'getlistDV', v : $stateParams.id },
            ag      : 'on-modal',
            cm      : 'closemodalDV'
        });
    };
    
});


/*  ========================================================
 *  ######################### FDE #######################
 *  ======================================================== */

App.controller('fdeListCtrl',function(apiData,$scope,apiBase,$stateParams,globalFunction,$rootScope){
    
    $scope.fdPL = {};
    $scope.listFDE = [];
    $scope.fdPL.PAGE = 1;
    $scope.fdPL.MAX_SIZE = 5;
    $scope.fdPL.LIMIT = 10;	
	
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
    
    $scope.getlistFDE = function(d){
        var p = '';
        if (d['MS_WILAYAH_ID'])
            p +=   'MS_WILAYAH_ID='+d['MS_WILAYAH_ID'];
        if (d['MS_KODE_CABANG'])
            p +=   '&MS_KODE_CABANG='+d['MS_KODE_CABANG'];
        if (d['MS_KODE_UNIT'])
            p +=   '&MS_KODE_UNIT='+d['MS_KODE_UNIT'];
        if (d['PAGE'])
            p +=   '&PAGE='+d['PAGE'];
        if (d['LIMIT'])
            p +=   '&LIMIT='+d['LIMIT'];
        if (d['SEARCH'])
            p +=   '&SEARCH='+d['SEARCH'];
        
		console.log(p);
		
        apiData.get({
            gl      : false,
            api     : apiBase+'fde/get_list/?'+p,
            scope   : $scope,
            sn      : 'listFDE',
            type    : 'object',
            callbacksuccess : function(R){
//                $scope.fdPL.TOTAL_ITEMS = $scope.listFDE.length;
                $scope.listFDE_ = R.data.content;
                $scope.fdPL.TOTAL_ITEMS = R.data.len;
            }
        });
    };
    
    $scope.$watchGroup(['fdPL.MS_WILAYAH_ID','fdPL.MS_KODE_CABANG','fdPL.MS_KODE_UNIT','fdPL.PAGE','fdPL.LIMIT','fdPL.SEARCH'], function(newValues, oldValues, scope) {
        if (newValues) {
            $scope.getlistFDE({
                MS_WILAYAH_ID   : typeof ($scope.fdPL.MS_WILAYAH_ID)!='undefined' ? $scope.fdPL.MS_WILAYAH_ID : '',
                MS_KODE_CABANG  : typeof ($scope.fdPL.MS_KODE_CABANG)!='undefined' ? $scope.fdPL.MS_KODE_CABANG : '',
                MS_KODE_UNIT    : typeof ($scope.fdPL.MS_KODE_UNIT)!='undefined' ? $scope.fdPL.MS_KODE_UNIT : '',								
                PAGE            : typeof ($scope.fdPL.PAGE)!='undefined' ? $scope.fdPL.PAGE : '',
                LIMIT           : typeof ($scope.fdPL.LIMIT)!='undefined' ? $scope.fdPL.LIMIT : '',
                SEARCH          : typeof ($scope.fdPL.SEARCH)!='undefined' ? $scope.fdPL.SEARCH : '',
            });
        }
    });
    
    $scope.pageChanged = function(p){
        $scope.fdPL.PAGE = p;
    };
    
    // $scope.modalBDG = function(){ remark FZL
        
        // var m = globalFunction.openModal('partials/modals/modal-banding.html','modal-banding modal-form','modalBandingCtrl');
        
        // $rootScope.closemodalBDG = function(){
            // m.close();
            // $scope.getlistFDE({
                // MS_WILAYAH_ID : typeof ($scope.fdPL.MS_WILAYAH_ID)!='undefined' ? $scope.fdPL.MS_WILAYAH_ID : '',
                // MS_KODE_CABANG : typeof ($scope.fdPL.MS_CABANG_KODE)!='undefined' ? $scope.fdPL.MS_CABANG_KODE : '',
                // MS_KODE_UNIT : typeof ($scope.fdPL.MS_UNIT_KODE)!='undefined' ? $scope.fdPL.MS_UNIT_KODE : ''
            // });
        // };
        
    // };
    
});

// App.controller('modalBandingCtrl',function($rootScope,$scope,$stateParams,apiData,apiBase,postBANDING){ remark FZL
    
    // $scope.fdBDG = {};
    
    // $scope.postBDG = function(){
        // $scope.fdBDG.DB_PROSPEK_ID = $rootScope.BANDING_DB_PROSPEK_ID;
        // $scope.fdBDG.PENGIRIM = $rootScope.$storage.SESSION_LOGIN.USERNAME;
        
        // if ($scope.fdBDG.DB_PROSPEK_ID) {
            // postBANDING.e($scope.fdBDG,$scope,function(){
                // $rootScope.closemodalBDG();
            // });
        // }
    // };
    
// });

App.controller('fdeCtrl',function($scope,$rootScope,apiData,$stateParams,apiBase,globalFunction,getDataStatusSubmit,$http,postDbIndividuStatus){
    
    $scope.HIDE_FDE_FOR_NEW_MMS = '';
    
    apiData.get_allDataCalonDebiturPerId($scope,$stateParams.id);
    getDataStatusSubmit.e();
    
    $scope.fdePT = $rootScope.fdePageTitle;
    $rootScope.PR_PROSPEK_ID = $stateParams.id;
    
    $scope.fdFDE = {};
    
    $scope.postFDE = function(){
        $scope.fdFDE.DB_PROSPEK_ID = $stateParams.id;
        $scope.cekrekening();
        apiData.post({
            gl      : true,
            api     : apiBase+'fde/post_alldata',
            data    : $scope.fdFDE,
            scope   : $scope,
            type    : 'tolist',
            callback: function(){
                if (!$scope.fdFDE.FDE_ID)
                    apiData.get_DFDE();
            }
        });
    };
    
    apiData.get_DFDE();
    
    $scope.$watch('DFDE', function(dataLoaded) {
        if (dataLoaded) {
            $scope.fdFDE = globalFunction.collectObject(
                $scope.DFDE.CALON_DEBITUR,
                $scope.DFDE.APLIKASI,
                $scope.DFDE.BIAYA,
                $scope.DFDE.PERJANJIAN_KREDIT,
                $scope.DFDE.FDE[0]
            );
            if ($scope.fdFDE.FDE_APLIKASI_TGL_PENGAJUAN_PROPOSAL)
                $scope.dtTPP = new Date($scope.fdFDE.FDE_APLIKASI_TGL_PENGAJUAN_PROPOSAL);
            if ($scope.fdFDE.FDE_APLIKASI_TGL_REALISASI)
                $scope.dtTR = new Date($scope.fdFDE.FDE_APLIKASI_TGL_REALISASI);
            if ($scope.fdFDE.FDE_PK_TANGGAL_SP3)
                $scope.dtTSP = new Date($scope.fdFDE.FDE_PK_TANGGAL_SP3);
            console.log($scope.fdFDE);
        }
    });
    
    $scope.cekrekening = function(){
        if ($scope.fdFDE.FDE_REKENING_TUJUAN_JENIS_ID == 420){
            $scope.fdFDE.FDE_REKENING_TUJUAN_NAMA_BANK_ID = $scope.fdFDE.FDE_REKENING_PRIBADI_NAMA_BANK_ID;
            $scope.fdFDE.FDE_REKENING_TUJUAN_KANTOR_CABANG = $scope.fdFDE.FDE_REKENING_PRIBADI_KANTOR_CABANG;
            $scope.fdFDE.FDE_REKENING_TUJUAN_NOMOR_REKENING = $scope.fdFDE.FDE_REKENING_PRIBADI_NOMOR_REKENING;
            $scope.fdFDE.FDE_REKENING_TUJUAN_ATAS_NAMA = $scope.fdFDE.FDE_REKENING_PRIBADI_ATAS_NAMA;
        } else {
            $scope.fdFDE.FDE_REKENING_TUJUAN_NAMA_BANK_ID = '';
            $scope.fdFDE.FDE_REKENING_TUJUAN_KANTOR_CABANG = '';
            $scope.fdFDE.FDE_REKENING_TUJUAN_NOMOR_REKENING = '';
            $scope.fdFDE.FDE_REKENING_TUJUAN_ATAS_NAMA = '';
            $scope.fdFDE.FDE_REKENING_TUJUAN_HUBUNGAN_ID = '';
        }
    };
    
    $scope.modalRMTM = function(){
        
        var m = globalFunction.openModal('partials/modals/modal-sync-mis-to-mss-response.html','modal-sync-mis-to-mss-response modal-form-50 modal-form','responseSyncMMSCtrl',$scope);
        
        $rootScope.closemodalRMTM= function(){
            m.close();
        };
        
    };
    
    $scope.treeOptions = {
        nodeChildren: "data",
        dirSelectable: true,
        injectClasses: {
            ul: "a1",
            li: "a2",
            liSelected: "a7",
            iExpanded: "a3",
            iCollapsed: "a4",
            iLeaf: "a5",
            label: "a6",
            labelSelected: "a8"
        }
    };
    
    $scope.submitFDE = function(){
        $scope.fdFDE.DB_PROSPEK_ID = $stateParams.id;
//        apiData.post({
//            gl      : true,
//            api     : apiBase+'fde/submit',
//            data    : $scope.fdFDE,
//            scope   : $scope,
//            callbacksuccess : function(R){
//                globalFunction.ag('success',[R]);
//            },
//            callbackfailed : function(R){
//                globalFunction.ag('danger',[R]);
//            }
//        });
        $http({
            method  : 'POST',
            url     : apiBase+'fde/submit',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            data: globalFunction.serializeObj($scope.fdFDE)
        }).then(function(R){
            console.log($scope.fdFDE);
            $scope.fdRMTM = {
                RESPONSE_STATUS_CODE    : R.status,
                RESPONSE_STATUS         : R.data.status,
                RESPONSE_DESC           : R.data.desc,
                
                RESPONSE_SYNC_DEBITUR   : R.data.data.respon_deb,
                RESPONSE_SYNC_LKKU      : R.data.data.respon_lkku,
                RESPONSE_SYNC_JAMINAN   : R.data.data.respon_jaminan
            };
            $scope.modalRMTM();
        });
    };
    
    $scope.$watchGroup(['DATA_STATUS_FOR_SUBMIT'],function(newValues, oldValues, scope){
        
        if (newValues){
            if (
                typeof($rootScope.DATA_STATUS_FOR_SUBMIT) != 'undefined'
            ) {
                if ($rootScope.DATA_STATUS_FOR_SUBMIT == 5)
                    $scope.FDE_SUBMITED = 1;
                else if ($rootScope.DATA_STATUS_FOR_SUBMIT > 5)
                    $scope.FDE_SUBMITED = 2;
            }
        }
        
    });
    
    $scope.submitFDENewMMS = function(){
        
        postDbIndividuStatus.e($stateParams.id,6,0);
        
    };
    
})
.controller('responseSyncMMSCtrl',function(){
    
    
    
});

App.controller('fdeVirtulaAccountCtrl',function($scope,globalFunction,$rootScope,apiData,apiBase,$stateParams){
    
    $scope.modalFVA = function(){
        
        var m = globalFunction.openModal('partials/modals/modal-fde-virtual-account.html','modal-fde-virtual-account modal-form','modalVirtualAccountCtrl');
        
        $rootScope.closemodalFVA = function(){
            m.close();
        };
        
    };
    
    $rootScope.getlistFVA = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'fde/get_virtualaccountlist/?id='+id,
            scope   : $rootScope,
            sn      : 'listFVA',
            type    : 'tolist'
        });
    };
    $rootScope.getlistFVA($stateParams.id);

    $scope.editFVA = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'fde/get_virtualaccountid/?id='+id,
            scope   : $rootScope,
            sn      : 'fdFVA'
        });
        $scope.modalFVA();
    };

    $scope.deleteFVA = function(d){
        apiData.post({
            gl      : true,
            api     : apiBase+'fde/delete_virtualaccount',
            data    : d,
            scope   : $scope,
            type    : 'tolist',
            reloadp : { k : 'getlistFVA', v : $stateParams.id }
        });
    };
    
})
.controller('modalVirtualAccountCtrl',function($scope,$stateParams,apiData,apiBase){
    
    $scope.postFVA = function(){
        $scope.fdFVA.DB_PROSPEK_ID = parseInt($stateParams.id);
        apiData.post({
            gl      : true,
            api     : apiBase+'fde/post_virtualaccount',
            data    : $scope.fdFVA,
            scope   : $scope,
            fd      : 'fdFVA',
            type    : 'tolist',
            reloadp : { k : 'getlistFVA', v : $stateParams.id },
            ag      : 'on-modal',
            cm      : 'closemodalFVA'
        });
    };
    
});

App.controller('fdeProdukAsuransiCtrl',function($scope,globalFunction,$rootScope,apiData,apiBase,$stateParams){
    
    $scope.modalPA = function(){
        
        var m = globalFunction.openModal('partials/modals/modal-fde-produk-asuransi.html','modal-produk-asuransi modal-form','modalProdukAsuransiCtrl');
        
        $rootScope.closemodalPA = function(){
            m.close();
        };
        
    };
    
    $rootScope.getlistPA = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'fde/get_produkasuransilist/?id='+id,
            scope   : $rootScope,
            sn      : 'listPA',
            type    : 'tolist'
        });
    };
    $rootScope.getlistPA($stateParams.id);

    $scope.editPA = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'fde/get_produkasuransiid/?id='+id,
            scope   : $rootScope,
            sn      : 'fdPA'
        });
        $scope.modalPA();
    };

    $scope.deletePA = function(d){
        apiData.post({
            gl      : true,
            api     : apiBase+'fde/delete_produkasuransi',
            data    : d,
            scope   : $scope,
            type    : 'tolist',
            reloadp : { k : 'getlistPA', v : $stateParams.id }
        });
    };
    
})
.controller('modalProdukAsuransiCtrl',function($scope,apiData,apiBase,$stateParams){
    
    $scope.postPA = function(){
        $scope.fdPA.DB_PROSPEK_ID = parseInt($stateParams.id);
        apiData.post({
            gl      : true,
            api     : apiBase+'fde/post_produkasuransi',
            data    : $scope.fdPA,
            scope   : $scope,
            fd      : 'fdPA',
            type    : 'tolist',
            reloadp : { k : 'getlistPA', v : $stateParams.id },
            ag      : 'on-modal',
            cm      : 'closemodalPA'
        });
    };
    
});

App.controller('fdeAsuransiLpkCtrl',function($scope,globalFunction,$rootScope,apiData,apiBase,$stateParams){
    
    $scope.fdFAL = {};
    
    $scope.postFAL = function(){
        $scope.fdFAL.DB_PROSPEK_ID = $stateParams.id;
        apiData.post({
            gl      : true,
            api     : apiBase+'fde/post_asuransilpk',
            data    : $scope.fdFAL,
            scope   : $scope,
            type    : 'tolist',
            fd      : 'fdFAL',
            reload  : 'getlistFAL'
        });
    };
    
    $rootScope.getlistFAL = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'fde/get_asuransilpklist/?id='+id,
            scope   : $scope,
            sn      : 'listFAL',
            type    : 'tolist'
        });
    };
    $rootScope.getlistFAL($stateParams.id);
    
    $scope.editFAL = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'fde/get_asuransilpkid/?id='+id,
            scope   : $scope,
            sn      : 'fdFAL'
        });
        $scope.modalFAL();
    };

    $scope.deleteFAL = function(d){
        apiData.post({
            gl      : true,
            api     : apiBase+'fde/delete_asuransilpk',
            data    : d,
            scope   : $scope,
            type    : 'tolist',
            reloadp : { k : 'getlistFAL', v : $stateParams.id }
        });
    };
    
});

App.controller('fdeHistoryApprovalCtrl',function($scope,apiData,apiBase,$stateParams,globalFunction,$rootScope){
    
    $scope.getlistFHA = function(id){				
        apiData.get({
            gl      : false,
            api     : apiBase+'fde/get_historyapproval/?id='+id,
            scope   : $scope,
            sn      : 'listFAH',
            type    : 'tolist'
        });
    };
    $scope.getlistFHA($stateParams.id);
	
	/*FZL*/
	$scope.modalBDG = function(){
        
        var m = globalFunction.openModal('partials/modals/modal-banding.html','modal-banding modal-form','modalBandingCtrl');
        
        $rootScope.closemodalBDG = function(){
            m.close();            
        };
        
    };    
	
	/*FZL*/
	$scope.modalFDN = function(data){
		
		console.log(data);
		$rootScope.FILE_PROPOSAL_BANDING = data;
        
        var m = globalFunction.openModal('partials/modals/modal-file-download.html','modal-file-download modal-form','');
        
        $rootScope.closemodalFDN = function(){
            m.close();            
        };
        
    };    
});
/*FZL*/
App.controller('modalBandingCtrl',function($rootScope,$scope,$stateParams,apiData,apiBase,postBANDING){
    
    $scope.fdBDG = {};
    
    $scope.postBDG = function(){
        $scope.fdBDG.DB_PROSPEK_ID = $stateParams.id;
        $scope.fdBDG.PENGIRIM = $rootScope.$storage.SESSION_LOGIN.USERNAME;
        
        if ($scope.fdBDG.DB_PROSPEK_ID) {
            postBANDING.e($scope.fdBDG,$scope,function(){
                $rootScope.closemodalBDG();
            });
        }
    };
    
});

/*FZL*/
App.controller('fdeTraceApprovalCtrl',function($rootScope,$scope,apiData,simapanBase,apiBase,$stateParams,globalFunction){
    
    $scope.getlistFTA = function(id){
        apiData.get({
            gl      : false,
            api     : simapanBase+'getTracking?DB_PROSPEK_ID='+id,
            scope   : $scope,
            sn      : 'listFTA',
            type    : 'tolist'
        });
    };
    $scope.getlistFTA($stateParams.id);
        	
	$scope.modalLPC = function(data){
		
		console.log(data);
		$rootScope.CATATAN_LACAK = data;
        
        var m = globalFunction.openModal('partials/modals/modal-trace-approval-catatan.html','modal-trace-approval-catatan modal-form','');
        
        $rootScope.closemodalLPC = function(){
            m.close();            
        };
        
    };   	
});

/*  ========================================================
 *  ######################### REVIEW #######################
 *  ======================================================== */

App.controller('reviewListCtrl',function(apiData,$scope,apiBase,$stateParams,$rootScope){
    
    $scope.fdPL = {};
    $scope.listRV = [];
    $scope.fdPL.PAGE = 1;
    $scope.fdPL.MAX_SIZE = 5;
    $scope.fdPL.LIMIT = 10;
    
//    if ($rootScope.$storage.SESSION_LOGIN.WILAYAH)
//        $scope.fdPL.MS_WILAYAH_ID = $rootScope.$storage.SESSION_LOGIN.WILAYAH;
//    if ($rootScope.$storage.SESSION_LOGIN.CABANG_KODE)
//        $scope.fdPL.MS_KODE_CABANG = $rootScope.$storage.SESSION_LOGIN.CABANG_KODE;
//    if ($rootScope.$storage.SESSION_LOGIN.UNIT_KODE)
//        $scope.fdPL.MS_KODE_UNIT = $rootScope.$storage.SESSION_LOGIN.UNIT_KODE;
    
    apiData.kantorSet({
        scope   : $scope,
        fd      : 'fdPL'
    });
    
    apiData.kantorExe($scope);
    
    $scope.getlistRVC = function(d){
        var p = '';
        if (d['MS_WILAYAH_ID'])
            p +=   'MS_WILAYAH_ID='+d['MS_WILAYAH_ID'];
        if (d['MS_KODE_CABANG'])
            p +=   '&MS_KODE_CABANG='+d['MS_KODE_CABANG'];
        if (d['MS_KODE_UNIT'])
            p +=   '&MS_KODE_UNIT='+d['MS_KODE_UNIT'];
        if (d['PAGE'])
            p +=   '&PAGE='+d['PAGE'];
        if (d['LIMIT'])
            p +=   '&LIMIT='+d['LIMIT'];
        if (d['SEARCH'])
            p +=   '&SEARCH='+d['SEARCH'];
        
        apiData.get({
            gl      : false,
            api     : apiBase+'review/get_list/?'+p,
            scope   : $scope,
            sn      : 'listRV',
            type    : 'object',
            callbacksuccess : function(R){
//                $scope.fdPL.TOTAL_ITEMS = $scope.listRV.length;
                $scope.listRV_ = R.data.content;
                $scope.fdPL.TOTAL_ITEMS = R.data.len;
            }
        });
    };
    
    $scope.$watchGroup(['fdPL.MS_WILAYAH_ID','fdPL.MS_KODE_CABANG','fdPL.MS_KODE_UNIT','fdPL.PAGE','fdPL.LIMIT','fdPL.SEARCH'], function(newValues, oldValues, scope) {
        if (newValues) {
            $scope.getlistRVC({
                'MS_WILAYAH_ID'     : typeof ($scope.fdPL.MS_WILAYAH_ID)!='undefined' ? $scope.fdPL.MS_WILAYAH_ID : '',
                'MS_KODE_CABANG'    : typeof ($scope.fdPL.MS_KODE_CABANG)!='undefined' ? $scope.fdPL.MS_KODE_CABANG : '',
                'MS_KODE_UNIT'      : typeof ($scope.fdPL.MS_KODE_UNIT)!='undefined' ? $scope.fdPL.MS_KODE_UNIT : '',
                'PAGE'              : typeof ($scope.fdPL.PAGE)!='undefined' ? $scope.fdPL.PAGE : '',
                'LIMIT'             : typeof ($scope.fdPL.LIMIT)!='undefined' ? $scope.fdPL.LIMIT : '',
                'SEARCH'            : typeof ($scope.fdPL.SEARCH)!='undefined' ? $scope.fdPL.SEARCH : ''
            });
        }
    });
    
    $scope.pageChanged = function(p){
        $scope.fdPL.PAGE = p;
    };
    
});

App.controller('reviewCtrl',function(apiData,$scope,$stateParams,$rootScope,apiBase,getDataStatusSubmit,globalFunction,modalService){
    
    $scope.fdRV = {};
    
    apiData.get_allDataCalonDebiturPerId($scope,$stateParams.id);
    
    $rootScope.PR_PROSPEK_ID = $stateParams.id;
    
    apiData.get_DRV();
    
    getDataStatusSubmit.e();
    
    $scope.$watch('DRV', function(dataLoaded) {
        if (dataLoaded) {
            $scope.fdRDU = $scope.DRV.DATA_UMUM;
            $scope.fdRDN = $scope.DRV.DATA_NASABAH;
            $scope.fdRRK = $scope.DRV.REKOMENDASI;
        }
    });
    
    $scope.postSUBMITSTATUS = function(){
        
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Submit',
            headerText: 'Submit Reviewer',
            bodyText: 'Apakah Anda yakin untuk submit proposal ini ?'
        }).then(function (result) {
            
            $scope.fdRV.DB_PROSPEK_ID = $stateParams.id;
            $scope.fdRV.PENGIRIM = $rootScope.$storage.SESSION_LOGIN.USERNAME;
            apiData.post({
                gl      : true,
                api     : apiBase+'review/post_submit',
                data    : $scope.fdRV,
                scope   : $scope,
                callbackfailed : function(R){
                    globalFunction.ag('danger',[R.content]);
                },
                callbacksuccess : function(){
                    getDataStatusSubmit.e();
                }
            });
            
        });
        
        
    };
    
    $scope.postTakeProposal = function(){
        
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Take',
            headerText: 'Take Dokumen',
            bodyText: 'Apakah Anda yakin untuk proses proposal ini ?'
        }).then(function (result) {
            
            $scope.fdRV.DB_PROSPEK_ID = $stateParams.id;
            $scope.fdRV.REVIEWER_IDSDM = $rootScope.$storage.SESSION_LOGIN.ID_SDM;
            $scope.fdRV.REVIEWER_INISIAL = '';
            $scope.fdRV.REVIEWER_NAMA = $rootScope.$storage.SESSION_LOGIN.NAMA;
            
            apiData.post({
                gl      : true,
                api     : apiBase+'review/post_takeproposal',
                data    : $scope.fdRV,
                scope   : $scope,
                callbackfailed : function(R){
                    globalFunction.ag('danger',[R.content]);
                },
                callbacksuccess : function(){
                    getDataStatusSubmit.e();
                }
            });
            
        });
        
    };		
    
    $rootScope.$watchGroup(['DATA_STATUS_FOR_SUBMIT','DATA_SUB_STATUS_FOR_SUBMIT','REVIEWER_IDSDM'],function(newValues, oldValues, scope){
        
        if (newValues){
            if (
                typeof($rootScope.DATA_STATUS_FOR_SUBMIT) != 'undefined'
            ) {
                if ($rootScope.REVIEWER_IDSDM != null && $rootScope.REVIEWER_IDSDM != $rootScope.$storage.SESSION_LOGIN.ID_SDM){
                    $scope.REVIEW_SUBMITED = 5;
                    $scope.REVIEW_LOCK = 'YES';
                } else if (($rootScope.DATA_STATUS_FOR_SUBMIT == 3 && $rootScope.DATA_SUB_STATUS_FOR_SUBMIT == 1 && $rootScope.REVIEWER_IDSDM == null) || $rootScope.REVIEWER_IDSDM == null && $rootScope.$storage.SESSION_LOGIN.CLUSTER.KRW == false){
                    $scope.REVIEW_SUBMITED = 4;
                    $scope.REVIEW_LOCK = 'YES';
                } else if ($rootScope.DATA_STATUS_FOR_SUBMIT == 3 && $rootScope.DATA_SUB_STATUS_FOR_SUBMIT == 3){
                    $scope.REVIEW_SUBMITED = 3;
                } else if ($rootScope.DATA_STATUS_FOR_SUBMIT == 3 && $rootScope.DATA_SUB_STATUS_FOR_SUBMIT == 2){
                    $scope.REVIEW_SUBMITED = 6; // lkku ulang
                } else if ($rootScope.DATA_STATUS_FOR_SUBMIT == 3){
                    $scope.REVIEW_SUBMITED = 1;
                } else if ($rootScope.DATA_STATUS_FOR_SUBMIT >= 4){
                    $scope.REVIEW_SUBMITED = 2;
                    $scope.REVIEW_LOCK = 'YES';
                }
            }
        }
        
    });
		
    $scope.getBWMP = function(d){
        apiData.get({
            gl      : true,
            api     : apiBase+'globalclass/get_bwmp?unit='+d['unit']+'&tipe_pembiayaan='+d['tipe_pembiayaan']+'&program='+d['id_program'],
            scope   : $scope,
            sn      : 'listBWMP',
            type    : 'tolist',
            callbacksuccess : function(){
                $scope.getBWMPDeviasi(d);
                $scope.modalBWMP();
            }
        });
    };
    
    $scope.getBWMPDeviasi = function(d){
        apiData.get({
            gl      : true,
            api     : apiBase+'globalclass/get_bwmp_deviasi?unit='+d['unit'],
            scope   : $scope,
            sn      : 'listBWMPDeviasi',
            type    : 'tolist',
            callbacksuccess : function(){
//                $scope.modalBWMP();
            }
        });
    };
    
    $scope.modalBWMP = function(){

        var m = globalFunction.openModal('partials/modals/modal-view-bwmp.html','modal-viw-bwmp modal-form','modalChangeBWMPCtrl',$scope);

        $rootScope.closemodalBWMP = function(){
            m.close();            
        };
        
    };
	
	/*FZL 12/12/2018 start*/
	$scope.getListReviewer = function(){
        apiData.get({
            gl      : true,
            api     : apiBase+'globalclass/get_reviewer?id_krw='+$rootScope.$storage.SESSION_LOGIN.ID_SDM,
            scope   : $scope,
            sn      : 'listReviewer',
            type    : 'tolist',
            callbacksuccess : function(R){
				console.log('listReviewer',R.data);
				$scope.modalListReviewer(); 
            }
        });
    };	
	
	$scope.modalListReviewer = function () {                
		
		var m = globalFunction.openModal('partials/modals/modal-list-reviewer.html', 'modal-list-reviewer modal-form', 'modalListReviewerCtrl',$scope);           				

        $rootScope.closemodalListReviewer = function () {
            m.close();
        };
    }; 
	/*FZL 12/12/2018 end*/
        
});

/*FZL 12/12/2018 start*/
App.controller('modalListReviewerCtrl',function($scope,modalService,apiData,apiBase,$stateParams,$rootScope,$filter,getDataStatusSubmit){
    
    $scope.fdPLReviewer = {};
    $scope.fdPLReviewer.PAGE = 1;
    $scope.fdPLReviewer.MAX_SIZE = 5;
    $scope.fdPLReviewer.LIMIT = 10;       
    
    $scope.postTakeProposal = function(d){
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Assign',
            headerText: 'Assign Dokumen',
            bodyText: 'Apakah Anda yakin untuk Assign proposal ini ke Reviewer '+d['nama']+' ?'
        }).then(function (result) {
			$rootScope.closemodalListReviewer();			
            
            $scope.fdRV.DB_PROSPEK_ID = $stateParams.id;
            $scope.fdRV.REVIEWER_IDSDM = d['reviewer_id'];
            $scope.fdRV.REVIEWER_INISIAL = '';
            $scope.fdRV.REVIEWER_NAMA = d['nama'];
            
            apiData.post({
                gl      : true,
                api     : apiBase+'review/post_takeproposal',
                data    : $scope.fdRV,
                scope   : $scope,
                callbackfailed : function(R){
                    globalFunction.ag('danger',[R.content]);
                },
                callbacksuccess : function(){
                    getDataStatusSubmit.e();
                }
            });
            
        });
    };
});
/*FZL 12/12/2018 end*/

App.controller('modalChangeBWMPCtrl',function($scope,modalService,apiData,apiBase,$stateParams,$rootScope,$filter){
    
    $scope.fdPLBWMP = {};
    $scope.listRV = [];
    $scope.fdPLBWMP.PAGE = 1;
    $scope.fdPLBWMP.MAX_SIZE = 5;
    $scope.fdPLBWMP.LIMIT = 10;
    
    //Deviasi
    $scope.fdPLBWMPDeviasi = {};
    $scope.listRV = [];
    $scope.fdPLBWMPDeviasi.PAGE = 1;
    $scope.fdPLBWMPDeviasi.MAX_SIZE = 5;
    $scope.fdPLBWMPDeviasi.LIMIT = 10;
    
    $scope.postBWMP = function(d){
        var e = {
            DB_PROSPEK_ID       : $stateParams.id,
            DB_BWMP             : d.inisialbwmp,
            DB_BWMP_NAMA        : d.namabwmp,
            DB_BWMP_SK_BERLAKU  : d.skberlakubwmp,
            DB_BWMP_SK_BERAKHIR : d.skberakhirbwmp,
            DB_BWMP_PLAFOND     : d.plafondskbwmp
        };
        
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Ubah',
            headerText: 'Ubah BWMP',
            bodyText: 'Apakah anda yakin mengubah data BWMP untuk proposal ini dengan '+e.DB_BWMP_NAMA+' ('+e.DB_BWMP+') sk berlaku dari '+ $filter('date')(e.DB_BWMP_SK_BERLAKU, "fullDate") + ' sampai dengan ' + $filter('date')(e.DB_BWMP_SK_BERAKHIR, "fullDate") + ' dan maksimal plafond ' + $filter('number')(e.DB_BWMP_PLAFOND, "") +' ?'
        }).then(function (result) {
            apiData.post({
                gl      : true,
                api     : apiBase+'globalclass/set_bwmp',
                data    : e,
                scope   : $scope,
                type    : 'tolist',
                callbacksuccess : function(){
                    apiData.get_DRV();
                    $rootScope.closemodalBWMP();
                }
            });
        });
    };

});



App.controller('reviewCommentCtrl',function($scope,$rootScope,globalFunction,apiData,apiBase,$stateParams){

$scope.fdPL = {};
$rootScope.listRVC = [];
$scope.fdPL.PAGE = 1;
$scope.fdPL.MAX_SIZE = 5;
$scope.fdPL.LIMIT = 10;

$scope.modalRVC = function(){

var m = globalFunction.openModal('partials/modals/modal-review-comment.html','modal-review-comment modal-form','modalReviewCommentCtrl',$scope);
        
        $rootScope.closemodalRVC = function(){
            m.close();
        };
        
    };
    
    $rootScope.getlistRVC = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'review/get_notelist/?id='+id,
            scope   : $rootScope,
            sn      : 'listRVC',
            type    : 'tolist',
            callbacksuccess : function(){
                $scope.fdPL.TOTAL_ITEMS = $rootScope.listRVC.length;
            }
        });
    };
    $rootScope.getlistRVC($stateParams.id);

    $scope.editRVC = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'review/get_noteid/?id='+id,
            scope   : $rootScope,
            sn      : 'fdRVC'
        });
        $scope.modalRVC();
    };

    $scope.deleteRVC = function(d){
        apiData.post({
            gl      : true,
            api     : apiBase+'review/delete_note',
            data    : d,
            scope   : $scope,
            type    : 'tolist',
            reloadp : { k : 'getlistRVC', v : $stateParams.id }
        });
    };
    
})
.controller('modalReviewCommentCtrl',function($scope,apiData,apiBase,$stateParams){
    
    $scope.postRVC = function(){
        $scope.fdRVC.DB_PROSPEK_ID = parseInt($stateParams.id);
        apiData.post({
            gl      : true,
            api     : apiBase+'review/post_note',
            data    : $scope.fdRVC,
            scope   : $scope,
            fd      : 'fdRVC',
            type    : 'tolist',
            reloadp : { k : 'getlistRVC', v : $stateParams.id },
            ag      : 'on-modal',
            cm      : 'closemodalRVC'
        });
    };
    
});

App.controller('reviewRekomendasiCtrl',function($scope,apiData,$stateParams,apiBase,$rootScope){
    
    $scope.fdRRK = {};
    
    $scope.postRRK = function(){
        $scope.fdRRK.DB_PROSPEK_ID = $stateParams.id;
        apiData.post({
            gl      : true,
            api     : apiBase+'review/post_persyaratantambahan',
            data    : $scope.fdRRK,
            scope   : $scope,
            type    : 'tolist',
            fd      : 'fdRRK',
            reload  : 'getlistRRK'
        });
    };
    
    $rootScope.getlistRRK = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'review/get_persyaratantambahanlist/?id='+id,
            scope   : $scope,
            sn      : 'listRRK',
            type    : 'tolist'
        });
    };
    $rootScope.getlistRRK($stateParams.id);
    
    $scope.editRRK = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'review/get_persyaratantambahanid/?id='+id,
            scope   : $scope,
            sn      : 'fdRRK'
        });
    };

    $scope.deleteRRK = function(d){
        apiData.post({
            gl      : true,
            api     : apiBase+'review/delete_persyaratantambahan',
            data    : d,
            scope   : $scope,
            type    : 'tolist',
            reloadp : { k : 'getlistRRK', v : $stateParams.id }
        });
    };
    
});

App.controller('reviewAnalisaSensitivitasCtrl',function(){
    
    
    
})

.controller('reviewAsFlCtrl',function($scope,apiData){
    
    apiData.get_DASE();
    
    $scope.$watch('DASE', function(dataLoaded) {
        if (dataLoaded) {
            $scope.fdFL = $scope.DASE.FASILITAS_LAMA;
        }
    });
    
})

.controller('reviewAsRcrCtrl',function($scope,apiData,apiBase,$rootScope,$scope,$stateParams){
    
    apiData.get_DASE();
	
	$scope.fdRCR = {};
    
    $scope.$watch('DASE', function(dataLoaded) {
        if (dataLoaded) {
            $scope.fdRCR = $scope.DASE.RCR;
        }
    });
    
    $scope.Math = window.Math;
    
    $scope.CALCULATE = function(){
        
        $scope.$watchGroup([
            'GBL_RCR_USULAN_TENOR',
            'GBL_RCR_REKOMENDASI_TENOR',
            'fdRCR',
            'GBL_RCR_REKOMENDASI_PINJAMAN_YANG_DI_REKOMENDASIKAN',
            'GBL_RCR_REKOMENDASI_BUNGA_PERCEN',
            'GBL_RCR_REKOMENDASI_TENOR',
            'SK3_SKENARIO_PERCENTAGE'
        ], function(newValues, oldValues, scope) {
            if (newValues) {

                $scope.GBL_RCR_USULAN_PINJAMAN_YANG_DI_USULKAN = parseInt($scope.fdRCR.RCR_USULAN_PINJAMAN_YANG_DIUSULKAN);
                $scope.GBL_RCR_USULAN_POKOK = $scope.Math.ceil($scope.GBL_RCR_USULAN_PINJAMAN_YANG_DI_USULKAN / $scope.GBL_RCR_USULAN_TENOR);
                $scope.GBL_RCR_USULAN_BUNGA_PERCEN = parseFloat($scope.fdRCR.RCR_USULAN_BUNGA);
                $scope.GBL_RCR_USULAN_BUNGA_RUPIAH = $scope.Math.ceil(($scope.GBL_RCR_USULAN_PINJAMAN_YANG_DI_USULKAN * ( $scope.GBL_RCR_USULAN_BUNGA_PERCEN / 100 )));
                $scope.GBL_RCR_USULAN_TENOR = parseInt($scope.fdRCR.RCR_USULAN_TENOR);
                $scope.GBL_RCR_USULAN_TOTAL_ANGSURAN = $scope.Math.ceil((($scope.GBL_RCR_USULAN_POKOK + $scope.GBL_RCR_USULAN_BUNGA_RUPIAH) / 50 )) * 50;

                $scope.GBL_RCR_REKOMENDASI_PINJAMAN_YANG_DI_REKOMENDASIKAN = parseInt($scope.fdRCR.RCR_REKOMENDASI_PINJAMAN_YANG_DIREOMENDASI);
                $scope.GBL_RCR_REKOMENDASI_POKOK = $scope.Math.ceil($scope.GBL_RCR_REKOMENDASI_PINJAMAN_YANG_DI_REKOMENDASIKAN / $scope.GBL_RCR_REKOMENDASI_TENOR);
                $scope.GBL_RCR_REKOMENDASI_BUNGA_PERCEN = parseFloat($scope.fdRCR.RCR_REKOMENDASI_BUNGA);
                $scope.GBL_RCR_REKOMENDASI_BUNGA_RUPIAH = $scope.Math.ceil(($scope.GBL_RCR_REKOMENDASI_PINJAMAN_YANG_DI_REKOMENDASIKAN * ( $scope.GBL_RCR_REKOMENDASI_BUNGA_PERCEN / 100 )));
                $scope.GBL_RCR_REKOMENDASI_TENOR = parseInt($scope.fdRCR.RCR_REKOMENDASI_TENOR);
                $scope.GBL_RCR_REKOMENDASI_TOTAL_ANGSURAN = $scope.Math.ceil((($scope.GBL_RCR_REKOMENDASI_POKOK + $scope.GBL_RCR_REKOMENDASI_BUNGA_RUPIAH) / 50 )) * 50;
                
                $scope.GBL_TOP_UP_RCR_USULAN_PINJAMAN_YANG_DI_USULKAN = 
                    $scope.Math.ceil((
                        (
                            $scope.Math.ceil(parseInt($scope.fdRCR.TOP_UP.RCR_USULAN_PINJAMAN_YANG_DIUSULKAN) / parseInt($scope.fdRCR.TOP_UP.RCR_USULAN_TENOR))
                            + $scope.Math.ceil((parseInt($scope.fdRCR.TOP_UP.RCR_USULAN_PINJAMAN_YANG_DIUSULKAN) * ( parseFloat($scope.fdRCR.TOP_UP.RCR_USULAN_BUNGA) / 100 )))    
                        ) / 50
                    )) * 50;
                
                $scope.RCR_SENSITIVITAS_STATUS = function(A,X){
                    
                    var B,C;
                    
                    if (A>=0 && A<30){
                        B = 'Low Risk';
                        C = 'label-success';
                    } else if (A>=30 && A<70) {
                        B = 'Moderat Risk';
                        C = 'label-info';
                    } else if (A>=70 && A<100) {
                        B = 'High Risk';
                        C = 'label-warning';
                    } else if (A<0 || A>=100) {
                        B = 'Very High Risk';
                        C = 'label-danger';
                    } else {
                        B = 'Out of Range';
                        C = 'label-danger';
                    }
                    
                    // $scope.GBL_RCR_USULAN_SENSITIVITAS_COLOR = C;
                    // $scope.GBL_RCR_REKOMENDASI_SENSITIVITAS_COLOR = C;		
					/*FZL tambahan parameter X*/
					if (X=='COLOR')
					return C;
					else						                    
                    return B;
                };

                /* Skenario-1 */

                $scope.SK1_PENJUALAN_PER_BULAN = parseInt($scope.fdRCR.PENJUALAN_PER_BULAN);
                $scope.SK1_SKENARIO_PERCENTAGE = 100;
                $scope.SK1_HPP = parseInt($scope.fdRCR.HPP);
                $scope.SK1_LABA_KOTOR = $scope.SK1_PENJUALAN_PER_BULAN - $scope.SK1_HPP;
                $scope.SK1_TOTAL_BIAYA_OPERASIONAL_USAHA = parseInt($scope.fdRCR.TOTAL_BIAYA_OPERASIONAL_USAHA);
                $scope.SK1_LABA_OPERASI = $scope.SK1_LABA_KOTOR - $scope.SK1_TOTAL_BIAYA_OPERASIONAL_USAHA;
                $scope.SK1_USAHA_LAINNYA_1 = parseInt($scope.fdRCR.USAHA_LAINNYA_1);
                $scope.SK1_USAHA_LAINNYA_2 = parseInt($scope.fdRCR.USAHA_LAINNYA_2);
                $scope.SK1_GAJI_SUAMI_OR_ISTRI = parseInt($scope.fdRCR.GAJI_SUAMI_ISTRI);
                $scope.SK1_JUMLAH_PENGHASILAN_LAINNYA = $scope.SK1_USAHA_LAINNYA_1 + $scope.SK1_USAHA_LAINNYA_2 + $scope.SK1_GAJI_SUAMI_OR_ISTRI;
                $scope.SK1_PENGHASILAN_SEBELUM_BIAYA_RT = $scope.SK1_LABA_OPERASI + $scope.SK1_JUMLAH_PENGHASILAN_LAINNYA;
                $scope.SK1_TOTAL_BIAYA_RUMAH_TANGGA = parseInt($scope.fdRCR.TOTAL_BIAYA_RM_TANGGA);
                $scope.SK1_SISA_PENGHASILAN_SEBELUM_ANGSURAN = $scope.SK1_PENGHASILAN_SEBELUM_BIAYA_RT - $scope.SK1_TOTAL_BIAYA_RUMAH_TANGGA;

                $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI = parseInt($scope.fdRCR.RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI);
                $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU = $scope.GBL_RCR_USULAN_TOTAL_ANGSURAN;
                $scope.SK1_RCR_USULAN_TOTAL_ANGSURAN = $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI + $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK1_RCR_USULAN_DISPOSABLE_INCOME = $scope.SK1_SISA_PENGHASILAN_SEBELUM_ANGSURAN - $scope.SK1_RCR_USULAN_TOTAL_ANGSURAN;

                $scope.SK1_RCR_USULAN_RCR_A_PINJAMAN_BARU = $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU / ($scope.SK1_SISA_PENGHASILAN_SEBELUM_ANGSURAN - $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI) * 100 ;
                $scope.SK1_RCR_USULAN_RCR_B_SEMUA_PINJAMAN = (($scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI + $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU) / $scope.SK1_SISA_PENGHASILAN_SEBELUM_ANGSURAN) * 100;
                $scope.SK1_RCR_USULAN_OPM_RATIO = ($scope.SK1_RCR_USULAN_DISPOSABLE_INCOME / ($scope.SK1_PENJUALAN_PER_BULAN + $scope.SK1_JUMLAH_PENGHASILAN_LAINNYA)) * 100;

                $scope.SK1_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI = $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI;
                $scope.SK1_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU = $scope.GBL_RCR_REKOMENDASI_TOTAL_ANGSURAN;
                $scope.SK1_RCR_REKOMENDASI_TOTAL_ANGSURAN = $scope.SK1_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI + $scope.SK1_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK1_RCR_REKOMENDASI_DISPOSABLE_INCOME = $scope.SK1_SISA_PENGHASILAN_SEBELUM_ANGSURAN - $scope.SK1_RCR_REKOMENDASI_TOTAL_ANGSURAN;

                $scope.SK1_RCR_REKOMENDASI_RCR_A_PINJAMAN_BARU = ( $scope.SK1_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU / ($scope.SK1_SISA_PENGHASILAN_SEBELUM_ANGSURAN - $scope.SK1_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI) )* 100;
                $scope.SK1_RCR_REKOMENDASI_RCR_B_SEMUA_PINJAMAN = ( $scope.SK1_RCR_REKOMENDASI_TOTAL_ANGSURAN / $scope.SK1_SISA_PENGHASILAN_SEBELUM_ANGSURAN ) * 100;
                $scope.SK1_RCR_REKOMENDASI_OPM_RATIO = ( $scope.SK1_RCR_REKOMENDASI_DISPOSABLE_INCOME / ($scope.SK1_PENJUALAN_PER_BULAN + $scope.SK1_JUMLAH_PENGHASILAN_LAINNYA) ) * 100;

                /* Skenario-2 */

                $scope.SK2_SKENARIO_PERCENTAGE = 80;
                $scope.SK2_PENJUALAN_PER_BULAN = $scope.SK1_PENJUALAN_PER_BULAN * ( $scope.SK2_SKENARIO_PERCENTAGE / 100 );
                $scope.SK2_HPP = $scope.SK1_HPP * ( $scope.SK2_SKENARIO_PERCENTAGE / 100 );
                $scope.SK2_LABA_KOTOR = $scope.SK2_PENJUALAN_PER_BULAN - $scope.SK2_HPP;
                $scope.SK2_TOTAL_BIAYA_OPERASIONAL_USAHA = ((70/100) * $scope.SK1_TOTAL_BIAYA_OPERASIONAL_USAHA) + ((30/100) * $scope.SK1_TOTAL_BIAYA_OPERASIONAL_USAHA * ($scope.SK2_SKENARIO_PERCENTAGE / 100)) ;
                $scope.SK2_LABA_OPERASI = $scope.SK2_LABA_KOTOR - $scope.SK2_TOTAL_BIAYA_OPERASIONAL_USAHA;
                $scope.SK2_USAHA_LAINNYA_1 = ($scope.SK2_SKENARIO_PERCENTAGE / 100) * $scope.SK1_USAHA_LAINNYA_1;
                $scope.SK2_USAHA_LAINNYA_2 = ($scope.SK2_SKENARIO_PERCENTAGE / 100) * $scope.SK1_USAHA_LAINNYA_2;
                $scope.SK2_GAJI_SUAMI_OR_ISTRI = $scope.SK1_GAJI_SUAMI_OR_ISTRI;
                $scope.SK2_JUMLAH_PENGHASILAN_LAINNYA = $scope.SK2_USAHA_LAINNYA_1 + $scope.SK2_USAHA_LAINNYA_2 + $scope.SK2_GAJI_SUAMI_OR_ISTRI;
                $scope.SK2_PENGHASILAN_SEBELUM_BIAYA_RT = $scope.SK2_LABA_OPERASI + $scope.SK2_JUMLAH_PENGHASILAN_LAINNYA;
                $scope.SK2_TOTAL_BIAYA_RUMAH_TANGGA = $scope.SK1_TOTAL_BIAYA_RUMAH_TANGGA;
                $scope.SK2_SISA_PENGHASILAN_SEBELUM_ANGSURAN = $scope.SK2_PENGHASILAN_SEBELUM_BIAYA_RT - $scope.SK2_TOTAL_BIAYA_RUMAH_TANGGA;

                $scope.SK2_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI = $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI;
                $scope.SK2_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU = $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK2_RCR_USULAN_TOTAL_ANGSURAN = $scope.SK2_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI + $scope.SK2_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK2_RCR_USULAN_DISPOSABLE_INCOME = $scope.SK2_SISA_PENGHASILAN_SEBELUM_ANGSURAN - $scope.SK2_RCR_USULAN_TOTAL_ANGSURAN;

                $scope.SK2_RCR_USULAN_RCR_A_PINJAMAN_BARU = 0;
                $scope.SK2_RCR_USULAN_RCR_B_SEMUA_PINJAMAN = (($scope.SK2_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI + $scope.SK2_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU) / $scope.SK2_SISA_PENGHASILAN_SEBELUM_ANGSURAN) * 100;
                $scope.SK2_RCR_USULAN_OPM_RATIO = ($scope.SK2_RCR_USULAN_DISPOSABLE_INCOME / ($scope.SK2_PENJUALAN_PER_BULAN + $scope.SK2_JUMLAH_PENGHASILAN_LAINNYA)) * 100;


                $scope.SK2_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI = $scope.SK1_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI;
                $scope.SK2_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU = $scope.SK1_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK2_RCR_REKOMENDASI_TOTAL_ANGSURAN = $scope.SK2_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI + $scope.SK2_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK2_RCR_REKOMENDASI_DISPOSABLE_INCOME = $scope.SK2_SISA_PENGHASILAN_SEBELUM_ANGSURAN - $scope.SK2_RCR_REKOMENDASI_TOTAL_ANGSURAN;

                $scope.SK2_RCR_REKOMENDASI_RCR_A_PINJAMAN_BARU = '';
                $scope.SK2_RCR_REKOMENDASI_RCR_B_SEMUA_PINJAMAN = ($scope.SK2_RCR_REKOMENDASI_TOTAL_ANGSURAN / $scope.SK2_SISA_PENGHASILAN_SEBELUM_ANGSURAN) * 100;
                $scope.SK2_RCR_REKOMENDASI_OPM_RATIO = ($scope.SK2_RCR_REKOMENDASI_DISPOSABLE_INCOME / ( $scope.SK2_PENJUALAN_PER_BULAN + $scope.SK2_JUMLAH_PENGHASILAN_LAINNYA)) * 100;


                /* Skenario-3 */

                $scope.SK3_SKENARIO_PERCENTAGE = parseFloat($scope.fdRCR.SK3_SKENARIO_PERCENTAGE);
                $scope.SK3_PENJUALAN_PER_BULAN = $scope.SK1_PENJUALAN_PER_BULAN * ($scope.SK3_SKENARIO_PERCENTAGE / 100);
                $scope.SK3_HPP = ($scope.SK3_SKENARIO_PERCENTAGE / 100) * $scope.SK1_HPP;
                $scope.SK3_LABA_KOTOR = $scope.SK3_PENJUALAN_PER_BULAN - $scope.SK3_HPP;
                $scope.SK3_TOTAL_BIAYA_OPERASIONAL_USAHA = ((70/100) * $scope.SK1_TOTAL_BIAYA_OPERASIONAL_USAHA) + ((30/100) * $scope.SK1_TOTAL_BIAYA_OPERASIONAL_USAHA * ($scope.SK3_SKENARIO_PERCENTAGE)/100);
                $scope.SK3_LABA_OPERASI = $scope.SK3_LABA_KOTOR - $scope.SK3_TOTAL_BIAYA_OPERASIONAL_USAHA;
                $scope.SK3_USAHA_LAINNYA_1 = ($scope.SK3_SKENARIO_PERCENTAGE) / 100 * $scope.SK1_USAHA_LAINNYA_1;
                $scope.SK3_USAHA_LAINNYA_2 = ($scope.SK3_SKENARIO_PERCENTAGE / 100) * $scope.SK1_USAHA_LAINNYA_2;
                $scope.SK3_GAJI_SUAMI_OR_ISTRI = $scope.SK1_GAJI_SUAMI_OR_ISTRI;
                $scope.SK3_JUMLAH_PENGHASILAN_LAINNYA = $scope.SK3_USAHA_LAINNYA_1 + $scope.SK3_USAHA_LAINNYA_2 + $scope.SK3_GAJI_SUAMI_OR_ISTRI;
                $scope.SK3_PENGHASILAN_SEBELUM_BIAYA_RT = $scope.SK3_LABA_OPERASI + $scope.SK3_JUMLAH_PENGHASILAN_LAINNYA;
                $scope.SK3_TOTAL_BIAYA_RUMAH_TANGGA = parseInt($scope.SK1_TOTAL_BIAYA_RUMAH_TANGGA);
                $scope.SK3_SISA_PENGHASILAN_SEBELUM_ANGSURAN = $scope.SK3_PENGHASILAN_SEBELUM_BIAYA_RT - $scope.SK3_TOTAL_BIAYA_RUMAH_TANGGA;

                $scope.SK3_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI = $scope.SK2_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI;
                $scope.SK3_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU = $scope.SK2_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK3_RCR_USULAN_TOTAL_ANGSURAN =  $scope.SK3_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI + $scope.SK3_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK3_RCR_USULAN_DISPOSABLE_INCOME = $scope.SK3_SISA_PENGHASILAN_SEBELUM_ANGSURAN - $scope.SK3_RCR_USULAN_TOTAL_ANGSURAN;

                $scope.SK3_RCR_USULAN_RCR_A_PINJAMAN_BARU = '';
                $scope.SK3_RCR_USULAN_RCR_B_SEMUA_PINJAMAN = '';
                $scope.SK3_RCR_USULAN_OPM_RATIO = '';


                $scope.SK3_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI = $scope.SK2_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI;
                $scope.SK3_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU = $scope.SK2_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK3_RCR_REKOMENDASI_TOTAL_ANGSURAN = $scope.SK3_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI + $scope.SK3_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK3_RCR_REKOMENDASI_DISPOSABLE_INCOME = $scope.SK3_SISA_PENGHASILAN_SEBELUM_ANGSURAN - $scope.SK3_RCR_REKOMENDASI_TOTAL_ANGSURAN;

                $scope.SK3_RCR_REKOMENDASI_RCR_A_PINJAMAN_BARU = '';
                $scope.SK3_RCR_REKOMENDASI_RCR_B_SEMUA_PINJAMAN = ($scope.SK3_RCR_REKOMENDASI_TOTAL_ANGSURAN / $scope.SK3_SISA_PENGHASILAN_SEBELUM_ANGSURAN) * 100;
                $scope.SK3_RCR_REKOMENDASI_OPM_RATIO = ( $scope.SK3_RCR_REKOMENDASI_DISPOSABLE_INCOME / ($scope.SK3_PENJUALAN_PER_BULAN + $scope.SK3_JUMLAH_PENGHASILAN_LAINNYA) ) * 100;


                /* TOP UP */
                
                $scope.TUP_SKENARIO_PERCENTAGE = $scope.fdRCR.TOP_UP.SK3_SKENARIO_PERCENTAGE;
                $scope.TUP_PENJUALAN_PER_BULAN = $scope.fdRCR.TOP_UP.PENJUALAN_PER_BULAN;
                $scope.TUP_HPP = $scope.fdRCR.TOP_UP.HPP;
                $scope.TUP_LABA_KOTOR = $scope.TUP_PENJUALAN_PER_BULAN - $scope.TUP_HPP;
                $scope.TUP_TOTAL_BIAYA_OPERASIONAL_USAHA = $scope.fdRCR.TOP_UP.TOTAL_BIAYA_OPERASIONAL_USAHA;
                $scope.TUP_LABA_OPERASI = $scope.TUP_LABA_KOTOR - $scope.TUP_TOTAL_BIAYA_OPERASIONAL_USAHA;
                $scope.TUP_USAHA_LAINNYA_1 = $scope.fdRCR.TOP_UP.USAHA_LAINNYA_1;
                $scope.TUP_USAHA_LAINNYA_2 = $scope.fdRCR.TOP_UP.USAHA_LAINNYA_2;
                $scope.TUP_GAJI_SUAMI_OR_ISTRI = $scope.fdRCR.TOP_UP.GAJI_SUAMI_ISTRI;
				
				// $scope.TUP_JUMLAH_PENGHASILAN_LAINNYA = $scope.TUP_USAHA_LAINNYA_1 + $scope.TUP_USAHA_LAINNYA_2 + $scope.TUP_GAJI_SUAMI_OR_ISTRI;
                // $scope.TUP_PENGHASILAN_SEBELUM_BIAYA_RT = $scope.TUP_LABA_OPERASI + $scope.TUP_JUMLAH_PENGHASILAN_LAINNYA;				
				
                $scope.TUP_JUMLAH_PENGHASILAN_LAINNYA = ($scope.TUP_USAHA_LAINNYA_1 * 1) + ($scope.TUP_USAHA_LAINNYA_2 * 1) + ($scope.TUP_GAJI_SUAMI_OR_ISTRI * 1);
                $scope.TUP_PENGHASILAN_SEBELUM_BIAYA_RT = ($scope.TUP_LABA_OPERASI * 1) + ($scope.TUP_JUMLAH_PENGHASILAN_LAINNYA * 1);
				
                $scope.TUP_TOTAL_BIAYA_RUMAH_TANGGA = $scope.fdRCR.TOP_UP.TOTAL_BIAYA_RM_TANGGA;
                $scope.TUP_SISA_PENGHASILAN_SEBELUM_ANGSURAN = $scope.TUP_PENGHASILAN_SEBELUM_BIAYA_RT - $scope.TUP_TOTAL_BIAYA_RUMAH_TANGGA;
                
                $scope.TUP_RCR_USULAN_PINJAMAN_YANG_DI_USULKAN = $scope.fdRCR.TOP_UP.RCR_USULAN_PINJAMAN_YANG_DIUSULKAN;
                $scope.TUP_RCR_USULAN_BUNGA_PERCEN = $scope.fdRCR.TOP_UP.RCR_USULAN_BUNGA;
                $scope.TUP_RCR_USULAN_TENOR = $scope.fdRCR.TOP_UP.RCR_USULAN_TENOR;
                
                $scope.TUP_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI = $scope.fdRCR.TOP_UP.RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI;
                $scope.TUP_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU = $scope.GBL_TOP_UP_RCR_USULAN_PINJAMAN_YANG_DI_USULKAN;
				
                // $scope.TUP_RCR_USULAN_TOTAL_ANGSURAN = $scope.TUP_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI + $scope.TUP_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU;
				
				$scope.TUP_RCR_USULAN_TOTAL_ANGSURAN = ($scope.TUP_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI * 1) + ($scope.TUP_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU * 1);
				
                $scope.TUP_RCR_USULAN_DISPOSABLE_INCOME = $scope.TUP_SISA_PENGHASILAN_SEBELUM_ANGSURAN - $scope.TUP_RCR_USULAN_TOTAL_ANGSURAN;

                $scope.TUP_RCR_USULAN_RCR_A_PINJAMAN_BARU = '';
                $scope.TUP_RCR_USULAN_RCR_B_SEMUA_PINJAMAN = (($scope.TUP_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI + $scope.TUP_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU) / $scope.TUP_SISA_PENGHASILAN_SEBELUM_ANGSURAN) * 100;
                $scope.TUP_RCR_USULAN_OPM_RATIO = ( $scope.TUP_RCR_USULAN_DISPOSABLE_INCOME / $scope.TUP_PENJUALAN_PER_BULAN ) * 100;


                $scope.TUP_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI = '';
                $scope.TUP_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU = '';
                $scope.TUP_RCR_REKOMENDASI_TOTAL_ANGSURAN = '';
                $scope.TUP_RCR_REKOMENDASI_DISPOSABLE_INCOME = '';

                $scope.TUP_RCR_REKOMENDASI_RCR_A_PINJAMAN_BARU = '';
                $scope.TUP_RCR_REKOMENDASI_RCR_B_SEMUA_PINJAMAN = '';
                $scope.TUP_RCR_REKOMENDASI_OPM_RATIO = '';
                
                $scope.GBL_RCR_USULAN_SENSITIVITAS = $scope.RCR_SENSITIVITAS_STATUS($scope.SK2_RCR_USULAN_RCR_B_SEMUA_PINJAMAN,'');
                $scope.GBL_RCR_REKOMENDASI_SENSITIVITAS = $scope.RCR_SENSITIVITAS_STATUS($scope.SK2_RCR_REKOMENDASI_RCR_B_SEMUA_PINJAMAN,'');
				
                $scope.GBL_RCR_USULAN_SENSITIVITAS_COLOR = $scope.RCR_SENSITIVITAS_STATUS($scope.SK2_RCR_USULAN_RCR_B_SEMUA_PINJAMAN,'COLOR');
                $scope.GBL_RCR_REKOMENDASI_SENSITIVITAS_COLOR = $scope.RCR_SENSITIVITAS_STATUS($scope.SK2_RCR_REKOMENDASI_RCR_B_SEMUA_PINJAMAN,'COLOR'); 	

            }
        });
        
    };
    
    $scope.CALCULATE();
    
    $scope.postRCR = function(){
        $scope.fdRCR.DB_PROSPEK_ID = $stateParams.id;
        apiData.post({
            gl      : true,
            api     : apiBase+'review/post_alldata',
            data    : $scope.fdRCR,
            scope   : $scope,
            fd      : 'fdSCR',
            dataType: 'multidimensional',
        });
    };
    
})

.controller('reviewAsRcrReviewerCtrl',function($scope,apiData,apiBase,$rootScope,$scope,$stateParams){
    
    apiData.get_DASE();
	
    $scope.fdRCR = {};
    
    $scope.$watch('DASE', function(dataLoaded) {
        if (dataLoaded) {
            $scope.fdRCR = $scope.DASE.RCR;
            $scope.fdRCR.PENJUALAN_PER_BULAN = $scope.DASE.RCR.RV_PENJUALAN_PERBULAN_SKENARIO_1;
            $scope.fdRCR.HPP = $scope.DASE.RCR.RV_HPP_SKENARIO_1;
            $scope.fdRCR.TOTAL_BIAYA_OPERASIONAL_USAHA = $scope.DASE.RCR.RV_TOTAL_BIAYA_OPERASIONAL_USAHA_SKENARIO_1;
            $scope.fdRCR.USAHA_LAINNYA_1 = $scope.DASE.RCR.RV_USAHA_LAINNYA_1_SKENARIO_1;
            $scope.fdRCR.USAHA_LAINNYA_2 = $scope.DASE.RCR.RV_USAHA_LAINNYA_2_SKENARIO_1;
            $scope.fdRCR.GAJI_SUAMI_ISTRI = $scope.DASE.RCR.RV_GAJI_SUAMI_ISTRI_SKENARIO_1;
            $scope.fdRCR.TOTAL_BIAYA_RM_TANGGA = $scope.DASE.RCR.RV_TOTAL_BIAYA_RUMAH_TANGGA_SKENARIO_1;
            $scope.fdRCR.RCR_USULAN_PINJAMAN_YANG_DIUSULKAN = $scope.DASE.RCR.RV_PINJAMAN_YANG_DIUSULKAN;
            $scope.fdRCR.RCR_USULAN_BUNGA = $scope.DASE.RCR.RV_BUNGA_YANG_DIUSULKAN;
            $scope.fdRCR.RCR_USULAN_TENOR = $scope.DASE.RCR.RV_TENOR_YANG_DIUSULKAN;
            $scope.fdRCR.RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI = $scope.DASE.RCR.RV_ANGSURAN_PINJAMAN_SAAT_INI_SKENARIO_1;
        }
    });
    
    $scope.Math = window.Math;
    
    $scope.CALCULATE = function(){
        
        $scope.$watchGroup([
            'GBL_RCR_USULAN_TENOR',
            'GBL_RCR_REKOMENDASI_TENOR',
            'fdRCR',
            'GBL_RCR_REKOMENDASI_PINJAMAN_YANG_DI_REKOMENDASIKAN',
            'GBL_RCR_REKOMENDASI_BUNGA_PERCEN',
            'GBL_RCR_REKOMENDASI_TENOR',
            'SK3_SKENARIO_PERCENTAGE'
        ], function(newValues, oldValues, scope) {
            if (newValues) {

                $scope.GBL_RCR_USULAN_PINJAMAN_YANG_DI_USULKAN = parseInt($scope.fdRCR.RCR_USULAN_PINJAMAN_YANG_DIUSULKAN);
                $scope.GBL_RCR_USULAN_POKOK = $scope.Math.ceil($scope.GBL_RCR_USULAN_PINJAMAN_YANG_DI_USULKAN / $scope.GBL_RCR_USULAN_TENOR);
                $scope.GBL_RCR_USULAN_BUNGA_PERCEN = parseFloat($scope.fdRCR.RCR_USULAN_BUNGA);
                $scope.GBL_RCR_USULAN_BUNGA_RUPIAH = $scope.Math.ceil(($scope.GBL_RCR_USULAN_PINJAMAN_YANG_DI_USULKAN * ( $scope.GBL_RCR_USULAN_BUNGA_PERCEN / 100 )));
                $scope.GBL_RCR_USULAN_TENOR = parseInt($scope.fdRCR.RCR_USULAN_TENOR);
                $scope.GBL_RCR_USULAN_TOTAL_ANGSURAN = $scope.Math.ceil((($scope.GBL_RCR_USULAN_POKOK + $scope.GBL_RCR_USULAN_BUNGA_RUPIAH) / 50 )) * 50;

                $scope.GBL_RCR_REKOMENDASI_PINJAMAN_YANG_DI_REKOMENDASIKAN = parseInt($scope.fdRCR.RCR_REKOMENDASI_PINJAMAN_YANG_DIREOMENDASI);
                $scope.GBL_RCR_REKOMENDASI_POKOK = $scope.Math.ceil($scope.GBL_RCR_REKOMENDASI_PINJAMAN_YANG_DI_REKOMENDASIKAN / $scope.GBL_RCR_REKOMENDASI_TENOR);
                $scope.GBL_RCR_REKOMENDASI_BUNGA_PERCEN = parseFloat($scope.fdRCR.RCR_REKOMENDASI_BUNGA);
                $scope.GBL_RCR_REKOMENDASI_BUNGA_RUPIAH = $scope.Math.ceil(($scope.GBL_RCR_REKOMENDASI_PINJAMAN_YANG_DI_REKOMENDASIKAN * ( $scope.GBL_RCR_REKOMENDASI_BUNGA_PERCEN / 100 )));
                $scope.GBL_RCR_REKOMENDASI_TENOR = parseInt($scope.fdRCR.RCR_REKOMENDASI_TENOR);
                $scope.GBL_RCR_REKOMENDASI_TOTAL_ANGSURAN = $scope.Math.ceil((($scope.GBL_RCR_REKOMENDASI_POKOK + $scope.GBL_RCR_REKOMENDASI_BUNGA_RUPIAH) / 50 )) * 50;
                
                $scope.GBL_TOP_UP_RCR_USULAN_PINJAMAN_YANG_DI_USULKAN = 
                    $scope.Math.ceil((
                        (
                            $scope.Math.ceil(parseInt($scope.fdRCR.TOP_UP.RCR_USULAN_PINJAMAN_YANG_DIUSULKAN) / parseInt($scope.fdRCR.TOP_UP.RCR_USULAN_TENOR))
                            + $scope.Math.ceil((parseInt($scope.fdRCR.TOP_UP.RCR_USULAN_PINJAMAN_YANG_DIUSULKAN) * ( parseFloat($scope.fdRCR.TOP_UP.RCR_USULAN_BUNGA) / 100 )))    
                        ) / 50
                    )) * 50;
                
                $scope.RCR_SENSITIVITAS_STATUS = function(A,X){
                    
                    var B,C;
                    
                    if (A>=0 && A<30){
                        B = 'Low Risk';
                        C = 'label-success';
                    } else if (A>=30 && A<70) {
                        B = 'Moderat Risk';
                        C = 'label-info';
                    } else if (A>=70 && A<100) {
                        B = 'High Risk';
                        C = 'label-warning';
                    } else if (A<0 || A>=100) {
                        B = 'Very High Risk';
                        C = 'label-danger';
                    } else {
                        B = 'Out of Range';
                        C = 'label-danger';
                    }
                    
                    // $scope.GBL_RCR_USULAN_SENSITIVITAS_COLOR = C;
                    // $scope.GBL_RCR_REKOMENDASI_SENSITIVITAS_COLOR = C;		
					/*FZL tambahan parameter X*/
					if (X=='COLOR')
					return C;
					else						                    
                    return B;
                };

                /* Skenario-1 */

                $scope.SK1_PENJUALAN_PER_BULAN = parseInt($scope.fdRCR.PENJUALAN_PER_BULAN);
                $scope.SK1_SKENARIO_PERCENTAGE = 100;
                $scope.SK1_HPP = parseInt($scope.fdRCR.HPP);
                $scope.SK1_LABA_KOTOR = $scope.SK1_PENJUALAN_PER_BULAN - $scope.SK1_HPP;
                $scope.SK1_TOTAL_BIAYA_OPERASIONAL_USAHA = parseInt($scope.fdRCR.TOTAL_BIAYA_OPERASIONAL_USAHA);
                $scope.SK1_LABA_OPERASI = $scope.SK1_LABA_KOTOR - $scope.SK1_TOTAL_BIAYA_OPERASIONAL_USAHA;
                $scope.SK1_USAHA_LAINNYA_1 = parseInt($scope.fdRCR.USAHA_LAINNYA_1);
                $scope.SK1_USAHA_LAINNYA_2 = parseInt($scope.fdRCR.USAHA_LAINNYA_2);
                $scope.SK1_GAJI_SUAMI_OR_ISTRI = parseInt($scope.fdRCR.GAJI_SUAMI_ISTRI);
                $scope.SK1_JUMLAH_PENGHASILAN_LAINNYA = $scope.SK1_USAHA_LAINNYA_1 + $scope.SK1_USAHA_LAINNYA_2 + $scope.SK1_GAJI_SUAMI_OR_ISTRI;
                $scope.SK1_PENGHASILAN_SEBELUM_BIAYA_RT = $scope.SK1_LABA_OPERASI + $scope.SK1_JUMLAH_PENGHASILAN_LAINNYA;
                $scope.SK1_TOTAL_BIAYA_RUMAH_TANGGA = parseInt($scope.fdRCR.TOTAL_BIAYA_RM_TANGGA);
                $scope.SK1_SISA_PENGHASILAN_SEBELUM_ANGSURAN = $scope.SK1_PENGHASILAN_SEBELUM_BIAYA_RT - $scope.SK1_TOTAL_BIAYA_RUMAH_TANGGA;

                $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI = parseInt($scope.fdRCR.RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI);
                $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU = $scope.GBL_RCR_USULAN_TOTAL_ANGSURAN;
                $scope.SK1_RCR_USULAN_TOTAL_ANGSURAN = $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI + $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK1_RCR_USULAN_DISPOSABLE_INCOME = $scope.SK1_SISA_PENGHASILAN_SEBELUM_ANGSURAN - $scope.SK1_RCR_USULAN_TOTAL_ANGSURAN;

                $scope.SK1_RCR_USULAN_RCR_A_PINJAMAN_BARU = $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU / ($scope.SK1_SISA_PENGHASILAN_SEBELUM_ANGSURAN - $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI) * 100 ;
                $scope.SK1_RCR_USULAN_RCR_B_SEMUA_PINJAMAN = (($scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI + $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU) / $scope.SK1_SISA_PENGHASILAN_SEBELUM_ANGSURAN) * 100;
                $scope.SK1_RCR_USULAN_OPM_RATIO = ($scope.SK1_RCR_USULAN_DISPOSABLE_INCOME / ($scope.SK1_PENJUALAN_PER_BULAN + $scope.SK1_JUMLAH_PENGHASILAN_LAINNYA)) * 100;

                $scope.SK1_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI = $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI;
                $scope.SK1_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU = $scope.GBL_RCR_REKOMENDASI_TOTAL_ANGSURAN;
                $scope.SK1_RCR_REKOMENDASI_TOTAL_ANGSURAN = $scope.SK1_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI + $scope.SK1_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK1_RCR_REKOMENDASI_DISPOSABLE_INCOME = $scope.SK1_SISA_PENGHASILAN_SEBELUM_ANGSURAN - $scope.SK1_RCR_REKOMENDASI_TOTAL_ANGSURAN;

                $scope.SK1_RCR_REKOMENDASI_RCR_A_PINJAMAN_BARU = ( $scope.SK1_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU / ($scope.SK1_SISA_PENGHASILAN_SEBELUM_ANGSURAN - $scope.SK1_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI) )* 100;
                $scope.SK1_RCR_REKOMENDASI_RCR_B_SEMUA_PINJAMAN = ( $scope.SK1_RCR_REKOMENDASI_TOTAL_ANGSURAN / $scope.SK1_SISA_PENGHASILAN_SEBELUM_ANGSURAN ) * 100;
                $scope.SK1_RCR_REKOMENDASI_OPM_RATIO = ( $scope.SK1_RCR_REKOMENDASI_DISPOSABLE_INCOME / ($scope.SK1_PENJUALAN_PER_BULAN + $scope.SK1_JUMLAH_PENGHASILAN_LAINNYA) ) * 100;

                /* Skenario-2 */

                $scope.SK2_SKENARIO_PERCENTAGE = 80;
                $scope.SK2_PENJUALAN_PER_BULAN = $scope.SK1_PENJUALAN_PER_BULAN * ( $scope.SK2_SKENARIO_PERCENTAGE / 100 );
                $scope.SK2_HPP = $scope.SK1_HPP * ( $scope.SK2_SKENARIO_PERCENTAGE / 100 );
                $scope.SK2_LABA_KOTOR = $scope.SK2_PENJUALAN_PER_BULAN - $scope.SK2_HPP;
                $scope.SK2_TOTAL_BIAYA_OPERASIONAL_USAHA = ((70/100) * $scope.SK1_TOTAL_BIAYA_OPERASIONAL_USAHA) + ((30/100) * $scope.SK1_TOTAL_BIAYA_OPERASIONAL_USAHA * ($scope.SK2_SKENARIO_PERCENTAGE / 100)) ;
                $scope.SK2_LABA_OPERASI = $scope.SK2_LABA_KOTOR - $scope.SK2_TOTAL_BIAYA_OPERASIONAL_USAHA;
                $scope.SK2_USAHA_LAINNYA_1 = ($scope.SK2_SKENARIO_PERCENTAGE / 100) * $scope.SK1_USAHA_LAINNYA_1;
                $scope.SK2_USAHA_LAINNYA_2 = ($scope.SK2_SKENARIO_PERCENTAGE / 100) * $scope.SK1_USAHA_LAINNYA_2;
                $scope.SK2_GAJI_SUAMI_OR_ISTRI = $scope.SK1_GAJI_SUAMI_OR_ISTRI;
                $scope.SK2_JUMLAH_PENGHASILAN_LAINNYA = $scope.SK2_USAHA_LAINNYA_1 + $scope.SK2_USAHA_LAINNYA_2 + $scope.SK2_GAJI_SUAMI_OR_ISTRI;
                $scope.SK2_PENGHASILAN_SEBELUM_BIAYA_RT = $scope.SK2_LABA_OPERASI + $scope.SK2_JUMLAH_PENGHASILAN_LAINNYA;
                $scope.SK2_TOTAL_BIAYA_RUMAH_TANGGA = $scope.SK1_TOTAL_BIAYA_RUMAH_TANGGA;
                $scope.SK2_SISA_PENGHASILAN_SEBELUM_ANGSURAN = $scope.SK2_PENGHASILAN_SEBELUM_BIAYA_RT - $scope.SK2_TOTAL_BIAYA_RUMAH_TANGGA;

                $scope.SK2_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI = $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI;
                $scope.SK2_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU = $scope.SK1_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK2_RCR_USULAN_TOTAL_ANGSURAN = $scope.SK2_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI + $scope.SK2_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK2_RCR_USULAN_DISPOSABLE_INCOME = $scope.SK2_SISA_PENGHASILAN_SEBELUM_ANGSURAN - $scope.SK2_RCR_USULAN_TOTAL_ANGSURAN;

                $scope.SK2_RCR_USULAN_RCR_A_PINJAMAN_BARU = 0;
                $scope.SK2_RCR_USULAN_RCR_B_SEMUA_PINJAMAN = (($scope.SK2_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI + $scope.SK2_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU) / $scope.SK2_SISA_PENGHASILAN_SEBELUM_ANGSURAN) * 100;
                $scope.SK2_RCR_USULAN_OPM_RATIO = ($scope.SK2_RCR_USULAN_DISPOSABLE_INCOME / ($scope.SK2_PENJUALAN_PER_BULAN + $scope.SK2_JUMLAH_PENGHASILAN_LAINNYA)) * 100;


                $scope.SK2_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI = $scope.SK1_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI;
                $scope.SK2_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU = $scope.SK1_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK2_RCR_REKOMENDASI_TOTAL_ANGSURAN = $scope.SK2_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI + $scope.SK2_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK2_RCR_REKOMENDASI_DISPOSABLE_INCOME = $scope.SK2_SISA_PENGHASILAN_SEBELUM_ANGSURAN - $scope.SK2_RCR_REKOMENDASI_TOTAL_ANGSURAN;

                $scope.SK2_RCR_REKOMENDASI_RCR_A_PINJAMAN_BARU = '';
                $scope.SK2_RCR_REKOMENDASI_RCR_B_SEMUA_PINJAMAN = ($scope.SK2_RCR_REKOMENDASI_TOTAL_ANGSURAN / $scope.SK2_SISA_PENGHASILAN_SEBELUM_ANGSURAN) * 100;
                $scope.SK2_RCR_REKOMENDASI_OPM_RATIO = ($scope.SK2_RCR_REKOMENDASI_DISPOSABLE_INCOME / ( $scope.SK2_PENJUALAN_PER_BULAN + $scope.SK2_JUMLAH_PENGHASILAN_LAINNYA)) * 100;


                /* Skenario-3 */

                $scope.SK3_SKENARIO_PERCENTAGE = parseFloat($scope.fdRCR.SK3_SKENARIO_PERCENTAGE);
                $scope.SK3_PENJUALAN_PER_BULAN = $scope.SK1_PENJUALAN_PER_BULAN * ($scope.SK3_SKENARIO_PERCENTAGE / 100);
                $scope.SK3_HPP = ($scope.SK3_SKENARIO_PERCENTAGE / 100) * $scope.SK1_HPP;
                $scope.SK3_LABA_KOTOR = $scope.SK3_PENJUALAN_PER_BULAN - $scope.SK3_HPP;
                $scope.SK3_TOTAL_BIAYA_OPERASIONAL_USAHA = ((70/100) * $scope.SK1_TOTAL_BIAYA_OPERASIONAL_USAHA) + ((30/100) * $scope.SK1_TOTAL_BIAYA_OPERASIONAL_USAHA * ($scope.SK3_SKENARIO_PERCENTAGE)/100);
                $scope.SK3_LABA_OPERASI = $scope.SK3_LABA_KOTOR - $scope.SK3_TOTAL_BIAYA_OPERASIONAL_USAHA;
                $scope.SK3_USAHA_LAINNYA_1 = ($scope.SK3_SKENARIO_PERCENTAGE) / 100 * $scope.SK1_USAHA_LAINNYA_1;
                $scope.SK3_USAHA_LAINNYA_2 = ($scope.SK3_SKENARIO_PERCENTAGE / 100) * $scope.SK1_USAHA_LAINNYA_2;
                $scope.SK3_GAJI_SUAMI_OR_ISTRI = $scope.SK1_GAJI_SUAMI_OR_ISTRI;
                $scope.SK3_JUMLAH_PENGHASILAN_LAINNYA = $scope.SK3_USAHA_LAINNYA_1 + $scope.SK3_USAHA_LAINNYA_2 + $scope.SK3_GAJI_SUAMI_OR_ISTRI;
                $scope.SK3_PENGHASILAN_SEBELUM_BIAYA_RT = $scope.SK3_LABA_OPERASI + $scope.SK3_JUMLAH_PENGHASILAN_LAINNYA;
                $scope.SK3_TOTAL_BIAYA_RUMAH_TANGGA = parseInt($scope.SK1_TOTAL_BIAYA_RUMAH_TANGGA);
                $scope.SK3_SISA_PENGHASILAN_SEBELUM_ANGSURAN = $scope.SK3_PENGHASILAN_SEBELUM_BIAYA_RT - $scope.SK3_TOTAL_BIAYA_RUMAH_TANGGA;

                $scope.SK3_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI = $scope.SK2_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI;
                $scope.SK3_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU = $scope.SK2_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK3_RCR_USULAN_TOTAL_ANGSURAN =  $scope.SK3_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI + $scope.SK3_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK3_RCR_USULAN_DISPOSABLE_INCOME = $scope.SK3_SISA_PENGHASILAN_SEBELUM_ANGSURAN - $scope.SK3_RCR_USULAN_TOTAL_ANGSURAN;

                $scope.SK3_RCR_USULAN_RCR_A_PINJAMAN_BARU = '';
                $scope.SK3_RCR_USULAN_RCR_B_SEMUA_PINJAMAN = '';
                $scope.SK3_RCR_USULAN_OPM_RATIO = '';


                $scope.SK3_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI = $scope.SK2_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI;
                $scope.SK3_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU = $scope.SK2_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK3_RCR_REKOMENDASI_TOTAL_ANGSURAN = $scope.SK3_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI + $scope.SK3_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU;
                $scope.SK3_RCR_REKOMENDASI_DISPOSABLE_INCOME = $scope.SK3_SISA_PENGHASILAN_SEBELUM_ANGSURAN - $scope.SK3_RCR_REKOMENDASI_TOTAL_ANGSURAN;

                $scope.SK3_RCR_REKOMENDASI_RCR_A_PINJAMAN_BARU = '';
                $scope.SK3_RCR_REKOMENDASI_RCR_B_SEMUA_PINJAMAN = ($scope.SK3_RCR_REKOMENDASI_TOTAL_ANGSURAN / $scope.SK3_SISA_PENGHASILAN_SEBELUM_ANGSURAN) * 100;
                $scope.SK3_RCR_REKOMENDASI_OPM_RATIO = ( $scope.SK3_RCR_REKOMENDASI_DISPOSABLE_INCOME / ($scope.SK3_PENJUALAN_PER_BULAN + $scope.SK3_JUMLAH_PENGHASILAN_LAINNYA) ) * 100;


                /* TOP UP */
                
                $scope.TUP_SKENARIO_PERCENTAGE = $scope.fdRCR.TOP_UP.SK3_SKENARIO_PERCENTAGE;
                $scope.TUP_PENJUALAN_PER_BULAN = $scope.fdRCR.TOP_UP.PENJUALAN_PER_BULAN;
                $scope.TUP_HPP = $scope.fdRCR.TOP_UP.HPP;
                $scope.TUP_LABA_KOTOR = $scope.TUP_PENJUALAN_PER_BULAN - $scope.TUP_HPP;
                $scope.TUP_TOTAL_BIAYA_OPERASIONAL_USAHA = $scope.fdRCR.TOP_UP.TOTAL_BIAYA_OPERASIONAL_USAHA;
                $scope.TUP_LABA_OPERASI = $scope.TUP_LABA_KOTOR - $scope.TUP_TOTAL_BIAYA_OPERASIONAL_USAHA;
                $scope.TUP_USAHA_LAINNYA_1 = $scope.fdRCR.TOP_UP.USAHA_LAINNYA_1;
                $scope.TUP_USAHA_LAINNYA_2 = $scope.fdRCR.TOP_UP.USAHA_LAINNYA_2;
                $scope.TUP_GAJI_SUAMI_OR_ISTRI = $scope.fdRCR.TOP_UP.GAJI_SUAMI_ISTRI;
				
				// $scope.TUP_JUMLAH_PENGHASILAN_LAINNYA = $scope.TUP_USAHA_LAINNYA_1 + $scope.TUP_USAHA_LAINNYA_2 + $scope.TUP_GAJI_SUAMI_OR_ISTRI;
                // $scope.TUP_PENGHASILAN_SEBELUM_BIAYA_RT = $scope.TUP_LABA_OPERASI + $scope.TUP_JUMLAH_PENGHASILAN_LAINNYA;				
				
                $scope.TUP_JUMLAH_PENGHASILAN_LAINNYA = ($scope.TUP_USAHA_LAINNYA_1 * 1) + ($scope.TUP_USAHA_LAINNYA_2 * 1) + ($scope.TUP_GAJI_SUAMI_OR_ISTRI * 1);
                $scope.TUP_PENGHASILAN_SEBELUM_BIAYA_RT = ($scope.TUP_LABA_OPERASI * 1) + ($scope.TUP_JUMLAH_PENGHASILAN_LAINNYA * 1);
				
                $scope.TUP_TOTAL_BIAYA_RUMAH_TANGGA = $scope.fdRCR.TOP_UP.TOTAL_BIAYA_RM_TANGGA;
                $scope.TUP_SISA_PENGHASILAN_SEBELUM_ANGSURAN = $scope.TUP_PENGHASILAN_SEBELUM_BIAYA_RT - $scope.TUP_TOTAL_BIAYA_RUMAH_TANGGA;
                
                $scope.TUP_RCR_USULAN_PINJAMAN_YANG_DI_USULKAN = $scope.fdRCR.TOP_UP.RCR_USULAN_PINJAMAN_YANG_DIUSULKAN;
                $scope.TUP_RCR_USULAN_BUNGA_PERCEN = $scope.fdRCR.TOP_UP.RCR_USULAN_BUNGA;
                $scope.TUP_RCR_USULAN_TENOR = $scope.fdRCR.TOP_UP.RCR_USULAN_TENOR;
                
                $scope.TUP_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI = $scope.fdRCR.TOP_UP.RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI;
                $scope.TUP_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU = $scope.GBL_TOP_UP_RCR_USULAN_PINJAMAN_YANG_DI_USULKAN;
				
                // $scope.TUP_RCR_USULAN_TOTAL_ANGSURAN = $scope.TUP_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI + $scope.TUP_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU;
				
				$scope.TUP_RCR_USULAN_TOTAL_ANGSURAN = ($scope.TUP_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI * 1) + ($scope.TUP_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU * 1);
				
                $scope.TUP_RCR_USULAN_DISPOSABLE_INCOME = $scope.TUP_SISA_PENGHASILAN_SEBELUM_ANGSURAN - $scope.TUP_RCR_USULAN_TOTAL_ANGSURAN;

                $scope.TUP_RCR_USULAN_RCR_A_PINJAMAN_BARU = '';
                $scope.TUP_RCR_USULAN_RCR_B_SEMUA_PINJAMAN = (($scope.TUP_RCR_USULAN_ANGSURAN_PINJAMAN_SAAT_INI + $scope.TUP_RCR_USULAN_ANGSURAN_PINJAMAN_ULAMM_BARU) / $scope.TUP_SISA_PENGHASILAN_SEBELUM_ANGSURAN) * 100;
                $scope.TUP_RCR_USULAN_OPM_RATIO = ( $scope.TUP_RCR_USULAN_DISPOSABLE_INCOME / $scope.TUP_PENJUALAN_PER_BULAN ) * 100;


                $scope.TUP_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_SAAT_INI = '';
                $scope.TUP_RCR_REKOMENDASI_ANGSURAN_PINJAMAN_ULAMM_BARU = '';
                $scope.TUP_RCR_REKOMENDASI_TOTAL_ANGSURAN = '';
                $scope.TUP_RCR_REKOMENDASI_DISPOSABLE_INCOME = '';

                $scope.TUP_RCR_REKOMENDASI_RCR_A_PINJAMAN_BARU = '';
                $scope.TUP_RCR_REKOMENDASI_RCR_B_SEMUA_PINJAMAN = '';
                $scope.TUP_RCR_REKOMENDASI_OPM_RATIO = '';
                
                $scope.GBL_RCR_USULAN_SENSITIVITAS = $scope.RCR_SENSITIVITAS_STATUS($scope.SK2_RCR_USULAN_RCR_B_SEMUA_PINJAMAN,'');
                $scope.GBL_RCR_REKOMENDASI_SENSITIVITAS = $scope.RCR_SENSITIVITAS_STATUS($scope.SK2_RCR_REKOMENDASI_RCR_B_SEMUA_PINJAMAN,'');
				
                $scope.GBL_RCR_USULAN_SENSITIVITAS_COLOR = $scope.RCR_SENSITIVITAS_STATUS($scope.SK2_RCR_USULAN_RCR_B_SEMUA_PINJAMAN,'COLOR');
                $scope.GBL_RCR_REKOMENDASI_SENSITIVITAS_COLOR = $scope.RCR_SENSITIVITAS_STATUS($scope.SK2_RCR_REKOMENDASI_RCR_B_SEMUA_PINJAMAN,'COLOR'); 	

            }
        });
        
    };
    
    $scope.CALCULATE();
    
    $scope.postRCR = function(){
        $scope.fdRCR.DB_PROSPEK_ID = $stateParams.id;
        apiData.post({
            gl      : true,
            api     : apiBase+'review/post_alldata',
            data    : $scope.fdRCR,
            scope   : $scope,
            fd      : 'fdSCR',
            dataType: 'multidimensional',
        });
    };
    
})

.controller('reviewAsAmkCtrl',function($scope,apiData,apiBase,$stateParams){
    
    $scope.loadDASE = function(){
        apiData.get_DASE();
    };
    $scope.loadDASE();
    
    $scope.$watchGroup([
        'DASE',
        'PERSEDIAAN_DOH_VER',
        'PIUTANG_DAGANG_DOH_VER',
        'HUTANG_DAGANG_DOH_VER',
        'fdAMK',
        'PERSEDIAAN_DOH_PROJ',
        'PIUTANG_DAGANG_DOH_PROJ',
        'HUTANG_DAGANG_DOH_PROJ',
        'fdAMK.AMK_PERSEDIAAN_DOH_PROJ',
        'fdAMK.AMK_PIUTANG_DAGANG_DOH_PROJ',
        'fdAMK.AMK_HUTANG_DAGANG_DOH_PROJ',
        'fdAMK.AMK_PERTUMBUHAN_OMSET_SATU_TAHUN_TERAKHIR',
        'fdAMK.AMK_PROYEKSI_PERTUMBUHAN_OMSET'
    ], function(dataLoaded) {
        if (dataLoaded) {
            $scope.fdRCR = $scope.DASE.RCR;
            $scope.fdAMK = $scope.DASE.ANALISA_MODAL_KERJA;
            
            $scope.SK1_PENJUALAN_PER_BULAN = $scope.fdRCR.PENJUALAN_PER_BULAN;
            $scope.SK1_HPP = $scope.fdRCR.HPP;

            $scope.PERTUMBUHAN_OMSET_SATU_TAHUN_TERAKHIR = $scope.fdAMK.AMK_PERTUMBUHAN_OMSET_SATU_TAHUN_TERAKHIR;
            $scope.PROYEKSI_PERTUMBUHAN_OMSET = $scope.fdAMK.AMK_PROYEKSI_PERTUMBUHAN_OMSET;
            
            if ($scope.fdAMK.AMK_PERSEDIAAN_DOH_PROJ)
                $scope.PERSEDIAAN_DOH_PROJ = $scope.fdAMK.AMK_PERSEDIAAN_DOH_PROJ;
            else
                $scope.PERSEDIAAN_DOH_PROJ = $scope.PERSEDIAAN_DOH_VER;
            
            if ($scope.fdAMK.AMK_PIUTANG_DAGANG_DOH_PROJ)
                $scope.PIUTANG_DAGANG_DOH_PROJ = $scope.fdAMK.AMK_PIUTANG_DAGANG_DOH_PROJ;
            else
                $scope.PIUTANG_DAGANG_DOH_PROJ = $scope.PIUTANG_DAGANG_DOH_VER;            
            
            if ($scope.fdAMK.AMK_HUTANG_DAGANG_DOH_PROJ)
                $scope.HUTANG_DAGANG_DOH_PROJ = $scope.fdAMK.AMK_HUTANG_DAGANG_DOH_PROJ;
            else
                $scope.HUTANG_DAGANG_DOH_PROJ = $scope.HUTANG_DAGANG_DOH_VER;
        }
    });
    
    $scope.Math = window.Math;
    
    $scope.CALCULATE_ANALISA_MODAL_KERJA = function(){
        
        $scope.$watchGroup([
            'PERSEDIAAN_SAAT_INI',
            'fdRCR',
            'fdAMK',
            'PERSEDIAAN_DOH_PROJ',
            'PIUTANG_DAGANG_DOH_PROJ',
            'HUTANG_DAGANG_DOH_PROJ',
            'fdAMK.AMK_PERSEDIAAN_DOH_PROJ',
            'fdAMK.AMK_PIUTANG_DAGANG_DOH_PROJ',
            'fdAMK.AMK_HUTANG_DAGANG_DOH_PROJ',
            'PERTUMBUHAN_OMSET_SATU_TAHUN_TERAKHIR',
            'PROYEKSI_PERTUMBUHAN_OMSET'
        ], function(newValues, oldValues, scope) {
            if (newValues) {
                
                $scope.PERSEDIAAN_SAAT_INI = $scope.fdAMK.AMK_PERSEDIAAN_SAAT_INI;
                $scope.PERSEDIAAN_DOH_VER = ($scope.PERSEDIAAN_SAAT_INI / $scope.SK1_HPP) * 30;
//                $scope.PERSEDIAAN_DOH_PROJ = $scope.fdAMK.AMK_PERSEDIAAN_DOH_PROJ;
//                $scope.PERSEDIAAN_DOH_PROJ = $scope.PERSEDIAAN_DOH_VER;
                $scope.PERSEDIAAN_PROYEKSI = ($scope.PERSEDIAAN_DOH_PROJ / 30) * $scope.SK1_HPP * (1 + ($scope.PROYEKSI_PERTUMBUHAN_OMSET / 100) );
                $scope.PERSEDIAAN_KETERANGAN = '';
                
                $scope.PIUTANG_DAGANG_SAAT_INI = $scope.fdAMK.AMK_PIUTANG_DAGANG_SAAT_INI;
                $scope.PIUTANG_DAGANG_DOH_VER = ($scope.PIUTANG_DAGANG_SAAT_INI / $scope.SK1_PENJUALAN_PER_BULAN) * 30;
//                $scope.PIUTANG_DAGANG_DOH_PROJ = $scope.fdAMK.AMK_PIUTANG_DAGANG_DOH_PROJ;
//                $scope.PIUTANG_DAGANG_DOH_PROJ = $scope.PIUTANG_DAGANG_DOH_VER;
                $scope.PIUTANG_DAGANG_PROYEKSI = ($scope.PIUTANG_DAGANG_DOH_PROJ / 30) * $scope.SK1_PENJUALAN_PER_BULAN * (1 + ($scope.PROYEKSI_PERTUMBUHAN_OMSET / 100) );
                $scope.PIUTANG_DAGANG_KETERANGAN = '';
                
                $scope.HUTANG_DAGANG_SAAT_INI = $scope.fdAMK.AMK_HUTANG_DAGANG_SAAT_INI;
                $scope.HUTANG_DAGANG_DOH_VER = ($scope.HUTANG_DAGANG_SAAT_INI / $scope.SK1_HPP) * 30;
//                $scope.HUTANG_DAGANG_DOH_PROJ = $scope.fdAMK.AMK_HUTANG_DAGANG_DOH_PROJ;
//                $scope.HUTANG_DAGANG_DOH_PROJ = $scope.HUTANG_DAGANG_DOH_VER;
                $scope.HUTANG_DAGANG_PROYEKSI = ($scope.HUTANG_DAGANG_DOH_PROJ / 30) * $scope.SK1_HPP * (1 + ($scope.PROYEKSI_PERTUMBUHAN_OMSET / 100) );
                $scope.HUTANG_DAGANG_KETERANGAN = '';

                $scope.MODAL_KERJA_BERSIH_SAAT_INI = $scope.PERSEDIAAN_SAAT_INI + $scope.PIUTANG_DAGANG_SAAT_INI - $scope.HUTANG_DAGANG_SAAT_INI;
                $scope.MODAL_KERJA_BERSIH_PROYEKSI = $scope.PERSEDIAAN_PROYEKSI + $scope.PIUTANG_DAGANG_PROYEKSI - $scope.HUTANG_DAGANG_PROYEKSI;
                $scope.TAMBAHAN_MODAL_KERJA_YANG_DIPERLUKAN_PROYEKSI = $scope.Math.abs($scope.MODAL_KERJA_BERSIH_PROYEKSI - $scope.MODAL_KERJA_BERSIH_SAAT_INI);
                $scope.PEMBIAYAAN_MODAL_KERJA_MAKS_PROYEKSI = 0.7 * $scope.MODAL_KERJA_BERSIH_PROYEKSI;
            
            }
        });

    };
    
    $scope.CALCULATE_ANALISA_MODAL_KERJA();
    
    $scope.postAMK = function(){
        $scope.fdAMK.DB_PROSPEK_ID = $stateParams.id;
        apiData.post({
            gl      : true,
            api     : apiBase+'review/post_alldata',
            data    : $scope.fdAMK,
            scope   : $scope,
            fd      : 'fdAMK',
            dataType: 'multidimensional',
            callback: function(){
                if (!$scope.fdAMK.RV_ID)
                    $scope.loadDASE();
            }
        });
    };
    
})

.controller('reviewAsAmkReviewerCtrl',function($scope,apiData,apiBase,$stateParams){
    
    $scope.loadDASE = function(){
        apiData.get_DASE();
    };
    $scope.loadDASE();
    
    $scope.$watch('DASE',function(dataLoaded) {
        if (dataLoaded) {
            $scope.fdRCR = $scope.DASE.RCR;
            $scope.fdRCR.PENJUALAN_PER_BULAN = $scope.DASE.RCR.RV_PENJUALAN_PERBULAN_SKENARIO_1;
            $scope.fdRCR.HPP = $scope.DASE.RCR.RV_HPP_SKENARIO_1;
            
            $scope.fdAMK = $scope.DASE.ANALISA_MODAL_KERJA;
            
            $scope.fdAMK.AMK_PERSEDIAAN_SAAT_INI = parseFloat($scope.DASE.ANALISA_MODAL_KERJA.RV_AMK_PERSEDIAAN_SAAT_INI);
            $scope.fdAMK.AMK_PIUTANG_DAGANG_SAAT_INI = parseFloat($scope.DASE.ANALISA_MODAL_KERJA.RV_AMK_PIUTANG_DAGANG_SAAT_INI);
            $scope.fdAMK.AMK_HUTANG_DAGANG_SAAT_INI = parseFloat($scope.DASE.ANALISA_MODAL_KERJA.RV_AMK_HUTANG_DAGANG_SAAT_INI);
            $scope.fdAMK.AMK_PERTUMBUHAN_OMSET_SATU_TAHUN_TERAKHIR = parseFloat($scope.DASE.ANALISA_MODAL_KERJA.RV_AMK_PERTUMBUHAN_OMSET_SATU_TAHUN_TERAKHIR);
            
            $scope.CALCULATE_ANALISA_MODAL_KERJA();
            
        }
    });
    
    $scope.Math = window.Math;
    
    $scope.CALCULATE_ANALISA_MODAL_KERJA = function(){
        
        $scope.$watchGroup([
            'fdRCR',
            'fdAMK',
            'fdAMK.AMK_PERSEDIAAN_DOH_PROJ',
            'fdAMK.AMK_PIUTANG_DAGANG_DOH_PROJ',
            'fdAMK.AMK_HUTANG_DAGANG_DOH_PROJ',
            'fdAMK.AMK_PERTUMBUHAN_OMSET_SATU_TAHUN_TERAKHIR',
            'fdAMK.AMK_PROYEKSI_PERTUMBUHAN_OMSET',
            'fdAMK.AMK_PERSEDIAAN_SAAT_INI',
            'fdAMK.AMK_PIUTANG_DAGANG_SAAT_INI',
            'fdAMK.AMK_HUTANG_DAGANG_SAAT_INI'
        ], function(newValues, oldValues, scope) {
            if (newValues) {
                
                $scope.SK1_PENJUALAN_PER_BULAN = $scope.fdRCR.PENJUALAN_PER_BULAN;
                $scope.SK1_HPP = $scope.fdRCR.HPP;
                
                $scope.PERTUMBUHAN_OMSET_SATU_TAHUN_TERAKHIR = $scope.fdAMK.AMK_PERTUMBUHAN_OMSET_SATU_TAHUN_TERAKHIR;
                $scope.PROYEKSI_PERTUMBUHAN_OMSET = $scope.fdAMK.AMK_PROYEKSI_PERTUMBUHAN_OMSET;
                
                if ($scope.fdAMK.AMK_PERSEDIAAN_DOH_PROJ)
                    $scope.PERSEDIAAN_DOH_PROJ = $scope.fdAMK.AMK_PERSEDIAAN_DOH_PROJ;
                else
                    $scope.PERSEDIAAN_DOH_PROJ = $scope.PERSEDIAAN_DOH_VER;

                if ($scope.fdAMK.AMK_PIUTANG_DAGANG_DOH_PROJ)
                    $scope.PIUTANG_DAGANG_DOH_PROJ = $scope.fdAMK.AMK_PIUTANG_DAGANG_DOH_PROJ;
                else
                    $scope.PIUTANG_DAGANG_DOH_PROJ = $scope.PIUTANG_DAGANG_DOH_VER;            

                if ($scope.fdAMK.AMK_HUTANG_DAGANG_DOH_PROJ)
                    $scope.HUTANG_DAGANG_DOH_PROJ = $scope.fdAMK.AMK_HUTANG_DAGANG_DOH_PROJ;
                else
                    $scope.HUTANG_DAGANG_DOH_PROJ = $scope.HUTANG_DAGANG_DOH_VER;
                
                $scope.PERSEDIAAN_SAAT_INI = $scope.fdAMK.AMK_PERSEDIAAN_SAAT_INI;
                $scope.PERSEDIAAN_DOH_VER = ($scope.PERSEDIAAN_SAAT_INI / $scope.SK1_HPP) * 30;
//                $scope.PERSEDIAAN_DOH_PROJ = $scope.fdAMK.AMK_PERSEDIAAN_DOH_PROJ;
//                $scope.PERSEDIAAN_DOH_PROJ = $scope.PERSEDIAAN_DOH_VER;
                $scope.PERSEDIAAN_PROYEKSI = ($scope.PERSEDIAAN_DOH_PROJ / 30) * $scope.SK1_HPP * (1 + ($scope.PROYEKSI_PERTUMBUHAN_OMSET / 100) );
                $scope.PERSEDIAAN_KETERANGAN = '';
                
                $scope.PIUTANG_DAGANG_SAAT_INI = $scope.fdAMK.AMK_PIUTANG_DAGANG_SAAT_INI;
                $scope.PIUTANG_DAGANG_DOH_VER = ($scope.PIUTANG_DAGANG_SAAT_INI / $scope.SK1_PENJUALAN_PER_BULAN) * 30;
//                $scope.PIUTANG_DAGANG_DOH_PROJ = $scope.fdAMK.AMK_PIUTANG_DAGANG_DOH_PROJ;
//                $scope.PIUTANG_DAGANG_DOH_PROJ = $scope.PIUTANG_DAGANG_DOH_VER;
                $scope.PIUTANG_DAGANG_PROYEKSI = ($scope.PIUTANG_DAGANG_DOH_PROJ / 30) * $scope.SK1_PENJUALAN_PER_BULAN * (1 + ($scope.PROYEKSI_PERTUMBUHAN_OMSET / 100) );
                $scope.PIUTANG_DAGANG_KETERANGAN = '';
                
                $scope.HUTANG_DAGANG_SAAT_INI = $scope.fdAMK.AMK_HUTANG_DAGANG_SAAT_INI;
                $scope.HUTANG_DAGANG_DOH_VER = ($scope.HUTANG_DAGANG_SAAT_INI / $scope.SK1_HPP) * 30;
//                $scope.HUTANG_DAGANG_DOH_PROJ = $scope.fdAMK.AMK_HUTANG_DAGANG_DOH_PROJ;
//                $scope.HUTANG_DAGANG_DOH_PROJ = $scope.HUTANG_DAGANG_DOH_VER;
                $scope.HUTANG_DAGANG_PROYEKSI = ($scope.HUTANG_DAGANG_DOH_PROJ / 30) * $scope.SK1_HPP * (1 + ($scope.PROYEKSI_PERTUMBUHAN_OMSET / 100) );
                $scope.HUTANG_DAGANG_KETERANGAN = '';

                $scope.MODAL_KERJA_BERSIH_SAAT_INI = $scope.PERSEDIAAN_SAAT_INI + $scope.PIUTANG_DAGANG_SAAT_INI - $scope.HUTANG_DAGANG_SAAT_INI;
                $scope.MODAL_KERJA_BERSIH_PROYEKSI = $scope.PERSEDIAAN_PROYEKSI + $scope.PIUTANG_DAGANG_PROYEKSI - $scope.HUTANG_DAGANG_PROYEKSI;
                $scope.TAMBAHAN_MODAL_KERJA_YANG_DIPERLUKAN_PROYEKSI = $scope.Math.abs($scope.MODAL_KERJA_BERSIH_PROYEKSI - $scope.MODAL_KERJA_BERSIH_SAAT_INI);
                $scope.PEMBIAYAAN_MODAL_KERJA_MAKS_PROYEKSI = 0.7 * $scope.MODAL_KERJA_BERSIH_PROYEKSI;
            
            }
        });

    };
    
    
    
    $scope.postAMK = function(){
        $scope.fdAMK.DB_PROSPEK_ID = $stateParams.id;
        apiData.post({
            gl      : true,
            api     : apiBase+'review/post_alldata',
            data    : $scope.fdAMK,
            scope   : $scope,
            fd      : 'fdAMK',
            dataType: 'multidimensional',
            callback: function(){
                if (!$scope.fdAMK.RV_ID)
                    $scope.loadDASE();
            }
        });
    };
    
});

App.controller('reviewAsAgScrCtrl',function($scope,$rootScope,apiData,apiBase,$stateParams,getNilaiPasarValidator){    
	
    $scope.fdSCR = {
        NILAI_PASAR_TANAH_DIREKOMENDASIKAN : {}
    };
    
    $scope.getlistRVAG = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'review/get_agunanlist/?id='+id,
            scope   : $scope,
            sn      : 'listRVAG',
            type    : 'tolist',
            callbacksuccess : function(R){
                $scope.fdSCR.NILAI_PASAR_TANAH_DIREKOMENDASIKAN_PER_METER_PERSEGI = {};
                $scope.fdSCR.NILAI_PASAR_TANAH_DIREKOMENDASIKAN = {};
                for(var i=0; i<R.data.length; i++){
                    if ($scope.fdSCR_2 == undefined)
                        $scope.fdSCR_2 = [];
                    if ($scope.fdSCR_2.NILAI_PASAR_TANAH_DIREKOMENDASIKAN == undefined)
                        $scope.fdSCR_2.NILAI_PASAR_TANAH_DIREKOMENDASIKAN = [];
                    $scope.fdSCR_2.NILAI_PASAR_TANAH_DIREKOMENDASIKAN[R.data[i].DB_INDIVIDU_AGUNAN_ID] = R.data[i].DB_NILAI_PASAR_DIREKOMENDASIKAN_SP;
                                                           
                }
                if (typeof($scope.fdSCR) != 'undefined' && typeof($scope.fdSCR_2) != 'undefined' )
                    $scope.fdSCR.NILAI_PASAR_TANAH_DIREKOMENDASIKAN = $scope.fdSCR_2.NILAI_PASAR_TANAH_DIREKOMENDASIKAN;
                
                $scope.nilaiPasarTanahRekomendasiPermeterPersegi(R.data);
                
                if (!$scope.fdSCR.TOTAL_NILAI_LIKUIDASI_DIREKOMENDASIKAN)
                    $scope.calculateNilaiLikuidasiRekomendasi($scope.listRVAG);
                   
                
                
                
                console.log('$scope.fdSCR',$scope.fdSCR);
            }
        });
    };
    
    
    $scope.loadDASE = function(){
        apiData.get_DASE();
    };
    $scope.loadDASE();
    
    $scope.$watchGroup(['DASE'], function(dataLoaded) {
        if (dataLoaded) {
            if (typeof($scope.DASE) != 'undefined')
                $scope.fdSCR = $scope.DASE.SCR;
            
            $scope.getlistRVAG($stateParams.id);
        }
    });
    
//    $scope.$watchGroup(['fdSCR_2.NILAI_PASAR_TANAH_DIREKOMENDASIKAN'], function(dataLoaded) {
//        if (dataLoaded) {
//            
//            if (typeof($scope.fdSCR) != 'undefined' && typeof($scope.fdSCR_2) != 'undefined' )
//                $scope.fdSCR.NILAI_PASAR_TANAH_DIREKOMENDASIKAN = $scope.fdSCR_2.NILAI_PASAR_TANAH_DIREKOMENDASIKAN;
//            if (!$scope.fdSCR.TOTAL_NILAI_LIKUIDASI_DIREKOMENDASIKAN)
//                 $scope.calculateNilaiLikuidasiRekomendasi($scope.listRVAG);
//        }
//    });

    $scope.nilaiPasarTanahRekomendasiPermeterPersegi = function(listRVAG){
        if (typeof(listRVAG) != 'undefined'){
            for (var i=0; i<listRVAG.length; i++){
                $scope.fdSCR.NILAI_PASAR_TANAH_DIREKOMENDASIKAN_PER_METER_PERSEGI[listRVAG[i].DB_INDIVIDU_AGUNAN_ID.toString()] = $scope.fdSCR.NILAI_PASAR_TANAH_DIREKOMENDASIKAN[listRVAG[i].DB_INDIVIDU_AGUNAN_ID.toString()] / listRVAG[i].DB_LUAS_TANAH_PER_METER_PERSEGI;
				console.log('NILAI PASAR TANAH PER METER PERSEGI', $scope.fdSCR.NILAI_PASAR_TANAH_DIREKOMENDASIKAN[listRVAG[i].DB_INDIVIDU_AGUNAN_ID.toString()] ,'  ', listRVAG[i].DB_LUAS_TANAH_PER_METER_PERSEGI );
            }
        }		        
    };
    
    $scope.calculateNilaiLikuidasiRekomendasi = function(listRVAG){
        
        $scope.fdSCR.TOTAL_NILAI_LIKUIDASI_DIREKOMENDASIKAN = 0;
        if (typeof(listRVAG) != 'undefined'){
            for (var i=0; i<listRVAG.length; i++){                
                $scope.fdSCR.NILAI_PASAR_TANAH_DIREKOMENDASIKAN[listRVAG[i].DB_INDIVIDU_AGUNAN_ID.toString()] = $scope.fdSCR.NILAI_PASAR_TANAH_DIREKOMENDASIKAN_PER_METER_PERSEGI[listRVAG[i].DB_INDIVIDU_AGUNAN_ID.toString()] * listRVAG[i].DB_LUAS_TANAH_PER_METER_PERSEGI;
                
                $scope.fdSCR.TOTAL_NILAI_LIKUIDASI_DIREKOMENDASIKAN = $scope.fdSCR.TOTAL_NILAI_LIKUIDASI_DIREKOMENDASIKAN + ( $scope.fdSCR.NILAI_PASAR_TANAH_DIREKOMENDASIKAN[listRVAG[i].DB_INDIVIDU_AGUNAN_ID.toString()] * listRVAG[i].DB_PERSENTASE_LIKUIDASI / 100 ) + listRVAG[i].DB_NILAI_LIKUIDASI_BANGUNAN;
				
				console.log('$scope.fdSCR.NILAI_PASAR_TANAH_DIREKOMENDASIKAN[listRVAG['+i+'].DB_INDIVIDU_AGUNAN_ID.toString()]',$scope.fdSCR.NILAI_PASAR_TANAH_DIREKOMENDASIKAN[listRVAG[i].DB_INDIVIDU_AGUNAN_ID.toString()]);
				console.log('$scope.fdSCR.NILAI_PASAR_TANAH_DIREKOMENDASIKAN[listRVAG['+i+'].DB_INDIVIDU_AGUNAN_ID.toString()]',listRVAG[i].DB_PERSENTASE_LIKUIDASI);
				console.log('listRVAG['+i+'].DB_NILAI_LIKUIDASI_BANGUNAN',listRVAG[i].DB_NILAI_LIKUIDASI_BANGUNAN);
            }			
            console.log('TOTAL_NILAI_LIKUIDASI_DIREKOMENDASIKAN ',$scope.fdSCR.TOTAL_NILAI_LIKUIDASI_DIREKOMENDASIKAN);
            console.log('listRVAG ',$scope.listRVAG);
        }		        
    };
//    
//    $scope.$watchCollection(['fdSCR'], function(dataLoaded) {
//        if (dataLoaded) {
//            $scope.calculateNilaiLikuidasiRekomendasi($scope.listRVAG);
//        }
//    });
    
    
    $scope.postSCR = function(){
        $scope.fdSCR.DB_PROSPEK_ID = $stateParams.id;		
		
        apiData.post({
            gl      : true,
            api     : apiBase+'review/post_alldata',
            data    : $scope.fdSCR,
            scope   : $scope,
            fd      : 'fdSCR',
            dataType: 'multidimensional',			
            callback: function(){
                if (!$scope.fdSCR.RV_ID)
                    $scope.loadDASE();
            }
        });
    };
    
});

App.controller('reviewAsDnSidCtrl',function($scope,$rootScope,apiData,apiBase,$stateParams){
    
    $scope.getlistDSID = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'review/get_sidlist/?id='+id,
            scope   : $scope,
            sn      : 'listDSID',
            type    : 'tolist'
        });
    };
    $scope.getlistDSID($stateParams.id);
    
});

App.controller('reviewDocCheckCtrl',function($scope,$rootScope,apiData,apiBase,$stateParams,globalFunction){
    
    $scope.fdDCK = {};
    
    $scope.getlistDCK = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'review/get_cekdokumen/?id='+id,
            scope   : $scope,
            sn      : 'listDCK',
            type    : 'tolist'
        });
    };
    $scope.getlistDCK($stateParams.id);
    
    $scope.postDCK = function(){
        $scope.fdDCK.DB_PROSPEK_ID = $stateParams.id;
        apiData.post({
            gl      : true,
            api     : apiBase+'review/post_cekdokumen',
            data    : $scope.fdDCK,
            scope   : $scope,
            fd      : 'fdDCK',
            dataType: 'multidimensional'
        });
    };
    
    $scope.modalRequestDocument = function(){
        
        var m = globalFunction.openModal('partials/modals/modal-review-request-document.html','modal-review-request-document modal-form','modalRequestDocumentCtrl',$scope);

        $rootScope.closemodalRD = function(){
            m.close();            
        };
        
    };
    
});

App.controller('modalRequestDocumentCtrl',function($scope,apiData,$stateParams,apiBase,getDataStatusSubmit,modalService,$rootScope){
    
    $scope.fdRDCK = {};
    
    $scope.DocForRequest = function(){
        var R = [];
        for (var i=0; i<$scope.listDCK.length; i++){
            if ($scope.listDCK[i].DOKUMEN.length <= 0)
                R.push($scope.listDCK[i]);
        }
        $scope.listDocForRequest = R;
    };
    
    $scope.postRDCK = function(){
        $scope.fdRDCK.DB_PROSPEK_ID = $stateParams.id;
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Request',
            headerText: 'Request Dokumen',
            bodyText: 'Apakah anda yakin melakukan request dokumen ?'
        }).then(function (result) {
            apiData.post({
                gl      : true,
                api     : apiBase+'review/post_requestdokumen',
                data    : $scope.fdRDCK,
                scope   : $scope,
                fd      : 'fdRDCK',
                dataType: 'multidimensional',
                callbacksuccess : function(){
                    getDataStatusSubmit.e();
                    $rootScope.closemodalRD();
                }
            });
        });
    };
    
});

/*  ========================================================
 *  #################### MANAJEMEN PRODUK ##################
 *  ======================================================== */

App.controller('produkListCtrl',function($scope,apiData,apiBase,globalFunction,$rootScope){
    
    $scope.fdPL = {};
    
    $scope.$watch('listProduk',function(newValues, oldValues, scope){
        if (newValues){
            $scope.fdPL.MAX_SIZE = 5;
            $scope.fdPL.TOTAL_ITEMS = $scope.listProduk.length * 2;
            $scope.fdPL.PAGE = 1;
            $scope.fdPL.LIMIT = 5;
        }
    });
    
    $rootScope.getlistPRD = function(){
        apiData.get({
            gl      : false,
            api     : apiBase+'produk/get_produklist/',
            scope   : $scope,
            sn      : 'listProduk',
            type    : 'tolist'
        });
    };
    $rootScope.getlistPRD();
    
    $scope.editPRD = function(id){
        apiData.get({
            gl      : true,
            api     : apiBase+'produk/get_produkid/?id='+id,
            scope   : $rootScope,
            sn      : 'fdPRD',
            setdate : [
                        { k : 'dtTAW', v : 'MP_TANGGAL_AWAL' },
                        { k : 'dtTAK', v : 'MP_TANGGAL_AKHIR' }
                    ]
        });
        $scope.modalCP();
        $scope.$watch('fdPRD',function(newValues, oldValues, scope){
            if (oldValues){
                
                if (typeof($scope.fdPRD.ARRAY_PENGGUNAAN_PRODUK) != 'undefined' && $scope.fdPRD.ARRAY_PENGGUNAAN_PRODUK.length > 0){
                    for (var i=0; i<$scope.fdPRD.ARRAY_PENGGUNAAN_PRODUK.length; i++){

                        if ($scope.fdPRD[$scope.fdPRD.ARRAY_PENGGUNAAN_PRODUK[i]['MP_PENGGOLONGAN_PENGGUNAAN']] == undefined){
                            $scope.fdPRD[$scope.fdPRD.ARRAY_PENGGUNAAN_PRODUK[i]['MP_PENGGOLONGAN_PENGGUNAAN']] = [];
                        }

                        $scope.fdPRD[$scope.fdPRD.ARRAY_PENGGUNAAN_PRODUK[i]['MP_PENGGOLONGAN_PENGGUNAAN']].push($scope.fdPRD.ARRAY_PENGGUNAAN_PRODUK[i]['MP_JENIS_PENGGOLONGAN_ID']);
                    }
                } 
            }
            
            if (newValues){
                $scope.fdPRD.BENTUK_USAHA = globalFunction.setCheckbox({
                    JAWABAN     : $scope.fdPRD.BENTUK_USAHA,
                    PERTANYAAN  : 'MS_BENTUK_USAHA_ID'
                });
                $scope.fdPRD.TUJUAN_PEMBIAYAAN = globalFunction.setCheckbox({
                    JAWABAN     : $scope.fdPRD.TUJUAN_PEMBIAYAAN,
                    PERTANYAAN  : 'MS_TUJUAN_PEMBIAYAAN_ID'
                });
                $scope.fdPRD.KATEGORI_PEMBIAYAAN = globalFunction.setCheckbox({
                    JAWABAN     : $scope.fdPRD.KATEGORI_PEMBIAYAAN,
                    PERTANYAAN  : 'MS_KATEGORI_PEMBIAYAAN_ID'
                });
                
                $rootScope.checkjenisSDK = function(){
                if ($scope.fdPRD.ARRAY_SUMBER_DANA != undefined){
                        if ($scope.fdPRD.ARRAY_SUMBER_DANA.length > 1) {
                            $scope.fdPRD.MS_JENIS_SUMBER_DANA_ID = 476;
                        } else {
                            $scope.fdPRD.MS_JENIS_SUMBER_DANA_ID = 477;
                        }
                    }
                    console.log('Check jenis sumber dana',$scope.fdPRD.MS_JENIS_SUMBER_DANA_ID);
                };
                $rootScope.checkjenisSDK();
                
            }
            
        });
        
    };
    
    $scope.deletePRD = function(d){
        apiData.post({
            gl      : true,
            api     : apiBase+'produk/delete_produk',
            data    : d,
            scope   : $scope,
            type    : 'tolist',
            reload  : 'getlistPRD'
        });
    };
    
    $scope.modalCP = function(){
        var m = globalFunction.openModal('partials/modals/modal-produk-create.html','modal-form modal-produk-create','modalProdukCreateCtrl');
        $rootScope.closemodalCP = function(){
            m.close();
        };
    };
    
})
.controller('modalProdukCreateCtrl',function($scope,$stateParams,apiData,apiBase,globalFunction,$rootScope){
    
//    $scope.fdPRD = {};
    
    $scope.tabChange = function(t){
        $scope.tab = t;
    };
    
    $scope.tabChange(1);
    
    $scope.modalSD = function(){
        var m = globalFunction.openModal('partials/modals/modal-produk-sumber-dana-kombinasi.html','modal-form modal-form-50 modal-produk-sumber-dana-kombinasi','modalProdukSumberDanaKombinasiCtrl');
        $rootScope.closemodalSD = function(){
            m.close();
        };
    };
    
    $scope.postPRDC = function(){

        $scope.fdPRD.BENTUK_USAHA = globalFunction.setCheckbox({
            JAWABAN     : $scope.fdPRD.BENTUK_USAHA,
            PERTANYAAN  : 'MS_BENTUK_USAHA_ID'
        });
        $scope.fdPRD.TUJUAN_PEMBIAYAAN = globalFunction.setCheckbox({
            JAWABAN     : $scope.fdPRD.TUJUAN_PEMBIAYAAN,
            PERTANYAAN  : 'MS_TUJUAN_PEMBIAYAAN_ID'
        });
        $scope.fdPRD.KATEGORI_PEMBIAYAAN = globalFunction.setCheckbox({
            JAWABAN     : $scope.fdPRD.KATEGORI_PEMBIAYAAN,
            PERTANYAAN  : 'MS_KATEGORI_PEMBIAYAAN_ID'
        });
        apiData.post({
            gl      : true,
            api     : apiBase+'produk/post_produk',
            data    : $scope.fdPRD,
            dataType: 'multidimensional',
            scope   : $scope,
            ag      : 'on-modal',
            reload  : 'getlistPRD'
        });
    };
    
    
    
    $scope.deleteSDK = function(item) { 
        var index = $scope.fdPRD.ARRAY_SUMBER_DANA.indexOf(item);
        $scope.fdPRD.ARRAY_SUMBER_DANA.splice(index, 1);
        console.log('SUMBER DANA',$scope.fdPRD.ARRAY_SUMBER_DANA);
    };
      
})
.controller('modalProdukSumberDanaKombinasiCtrl',function($scope,$stateParams,apiData,apiBase,globalFunction,$rootScope){
    
    $rootScope.fdSDK={};
    
    $scope.postSDK = function(){
        if ($rootScope.fdPRD.ARRAY_SUMBER_DANA == undefined)
            $rootScope.fdPRD.ARRAY_SUMBER_DANA = [];
        $rootScope.fdPRD.ARRAY_SUMBER_DANA.push({
            MP_SUMBER_DANA_ID : '',
            MP_SUMBER_DANA_PIL_ID : $rootScope.fdSDK.MP_SUMBER_DANA_PIL_ID,
            MP_KOMPOSISI : $rootScope.fdSDK.MP_KOMPOSISI
        });
    };
    
});

App.controller('produkCtrl',function($rootScope,apiBase,apiData,$scope){
    
    $rootScope.getlistPRD = function(){
        apiData.get({
            gl      : false,
            api     : apiBase+'produk/get_produklist/',
            scope   : $rootScope,
            sn      : 'listProduk',
            type    : 'tolist'
        });
    };
    $rootScope.getlistPRD();
    
});

App.controller('produkKategoriCtrl',function($scope,globalFunction,$filter,apiData,apiBase,$stateParams,$rootScope){
    
    $scope.fdPRDK = {};
    
    globalFunction.VDPmultiselect($scope);
    
    $scope.KS = [];
    
    $scope.getlistKS = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'produk/get_produkkategoriid/?id='+id,
            scope   : $scope,
            sn      : 'listKS',
            type    : 'tolist'
        });
        $scope.$watch('listKS',function(newValue,oldValue){
            $scope.KS = $scope.listKS;
        });
    };
    
    $scope.KB = [];
    
    $scope.getlistKB = function(){
        $scope.KB = [];
        var a = $rootScope.MS_KATEGORI_PRODUK_ID;
        
        for (var i=0; i<a.length; i++)
        {
            $scope.KB.push(a[i]);
        }
        console.log('KB',$scope.KB);
    };
    $scope.filterKB = function(e) {
        for (var i=0; i<$scope.KB.length; i++)
        {
            for (var j=0; j<$scope.KS.length; j++)
            {
                if ($scope.KB[i] != undefined)
                {
                    if ($scope.KB[i].MS_PARA_GLOBAL_DETAIL_ID == $scope.KS[j].MP_KATEGORI_ID)
                        $scope.KB.splice(i, 1);
                    else if ($scope.KB[i].MS_PARA_GLOBAL_DETAIL_ID != undefined)
                        $scope.KB[i].MP_KATEGORI_ID = $scope.KB[i].MS_PARA_GLOBAL_DETAIL_ID;
                } 
                
            }
        }
        return $scope.KB;
    };
    
    $scope.SELECTKS = function () {
        $scope.KS_SELECTED = $filter('filter')($scope.KS, {checked: true});
    };
    
    $scope.SELECTKB = function () {
        $scope.KB_SELECTED = $filter('filter')($scope.KB, {checked: true});
    };
    
    $scope.postPRDK = function(){
        $scope.fdPRDK.MP_KATEGORI_ID = [];
        
        for (var i=0; i<$scope.KS.length; i++)
        {
            if ($scope.KS[i]['MP_KATEGORI_ID'] == undefined)
                $scope.fdPRDK.MP_KATEGORI_ID.push($scope.KS[i]['MP_PARA_GLOBAL_DETAIL_ID']);
            else
                $scope.fdPRDK.MP_KATEGORI_ID.push($scope.KS[i]['MP_KATEGORI_ID']);
        }
        
        apiData.post({
            gl      : true,
            api     : apiBase+'produk/post_produkkategori',
            data    : $scope.fdPRDK,
            scope   : $scope,
            dataType: 'multidimensional'
        });
    };
    
});

App.controller('produkLokasiCtrl',function($scope,globalFunction,$filter,$stateParams,apiData,apiBase){
    
    $scope.fdPRDL = {};
    
    apiData.kantorExe($scope);
    
    globalFunction.VDPmultiselect($scope);
    
    $scope.LS = [];
    
    $scope.getlistLS = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'produk/get_produklokasiid/?id='+id,
            scope   : $scope,
            sn      : 'listLS',
            type    : 'tolist'
        });
        $scope.$watch('listLS',function(newValue,oldValue){
            for (var i=0; i<$scope.listLS.length; i++)
            {
                $scope.LS.push({
                    id : $scope.listLS[i]['MP_PRODUK_ID'], 
                    wilayah : $scope.listLS[i]['MP_KODE_WILAYAH'], 
                    cabang : $scope.listLS[i]['MP_KODE_CABANG'], 
                    unit : $scope.listLS[i]['MP_KODE_UNIT']
                });
            }
        });
    };
    
    $scope.LB = [];
    
    $scope.SELECTLS = function () {
        $scope.LS_SELECTED = $filter('filter')($scope.LS, {checked: true});
    };
    
    $scope.SELECTLB = function () {
        $scope.LB_SELECTED = $filter('filter')($scope.LB, {checked: true});
    };
    
    $scope.postPRDL = function(){
        $scope.fdPRDL.DB_PROSPEK_ID = $stateParams.id;
        apiData.post({
            gl      : true,
            api     : apiBase+'produk/post_produklokasi',
            data    : $scope.fdPRDL,
            scope   : $scope
        });
    };
    
});

App.controller('produkScoringCtrl',function($scope,globalFunction,$filter,$stateParams,apiData,apiBase){
    
    globalFunction.VDPmultiselect($scope);
    
    $scope.SS = [
        {id : 1, jenis_pembiayaan : 'A', nama_scema : 'Aa'},
        {id : 2, jenis_pembiayaan : 'B', nama_scema : 'Bb'},
        {id : 3, jenis_pembiayaan : 'C', nama_scema : 'Cc'}
    ];
    
    $scope.SB = [];
    
    $scope.SELECTSS = function () {
        $scope.SS_SELECTED = $filter('filter')($scope.SS, {checked: true});
    };
    
    $scope.SELECTSB = function () {
        $scope.SB_SELECTED = $filter('filter')($scope.SB, {checked: true});
    };
    
    $scope.postPRDS = function(){
        $scope.fdPRDS.DB_PROSPEK_ID = $stateParams.id;
        apiData.post({
            gl      : true,
            api     : apiBase+'produk/post_produklokasi',
            data    : $scope.fdPRDS,
            scope   : $scope
        });
    };
    
});

/* ==================================================================================
 * ########################### USER MANAGEMENT CONTOLLER ############################
 * ==================================================================================*/

App.controller('userManagementSettingCtrl',function($scope,globalFunction,$filter,$stateParams,apiData,apiBase){
    
    $scope.fdUMS = {};
    
    $scope.postUMS = function(){
        apiData.post({
            gl      : true,
            api     : apiBase+'usermanagement/post_role',
            data    : $scope.fdUMS,
            scope   : $scope,
            type    : 'tolist',
            dataType: 'multidimensional',
            reloadp : { k : 'getlistUMS', v : '' },
            fd      : 'fdUMS'
        });
    };
    
    $scope.getlistUMS = function(){
        apiData.get({
            gl      : true,
            api     : apiBase+'usermanagement/get_role',
            scope   : $scope,
            sn      : 'listUMS',
            type    : 'tolist'
        });
    };
    $scope.getlistUMS();
    
    $scope.getMENU = function(){
        apiData.get({
            gl      : true,
            api     : apiBase+'usermanagement/get_menu',
            scope   : $scope,
            sn      : 'listMENU',
            type    : 'tolist'
        });
    };
    $scope.getMENU();
    
    $scope.editUMS = function(id){
        apiData.get({
            gl      : false,
            api     : apiBase+'usermanagement/get_roleid/?group_alias='+id,
            scope   : $scope,
            sn      : 'fdUMS',
            type    : 'object',
            callbacksuccess : function(){
                
                $scope.fdUMS.UM_MENU_CHECKED = [];
                
                for (var i=0; i<$scope.listMENU.length; i++){
                    if ($scope.fdUMS.UM_MENU_CHECKED_DEFAULT.indexOf($scope.listMENU[i].UM_MENU_ALIAS) >= 0){
                        $scope.fdUMS.UM_MENU_CHECKED[i] = $scope.listMENU[i].UM_MENU_ALIAS;   
                    }
                }
                
            }
        });
    };
    
    $scope.deleteUMS = function(d){
        apiData.post({
            gl      : true,
            api     : apiBase+'usermanagement/delete_role',
            data    : d,
            scope   : $scope,
            type    : 'tolist',
            dataType: 'multidimensional',
            reloadp : { k : 'getlistUMS', v : '' }
        });
    };
    
});

/* ==================================================================================
 * ########################### PROPOSAL CONTOLLER ############################
 * ==================================================================================*/

App.controller('proposalListCtrl',function($scope,globalFunction,$filter,$stateParams,apiData,apiBase,$rootScope){
    
    $scope.fdPL = {};
    $scope.listPS = [];
    $scope.fdPL.PAGE = 1;
    $scope.fdPL.MAX_SIZE = 5;
    $scope.fdPL.LIMIT = 10;
    $scope.fdPS = {};
//    $scope.fdPL.TOTAL_ITEMS = 100;

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
    
    $scope.list = function(d){
        var p = '';
        if (d['MS_WILAYAH_ID'])
            p +=   'MS_WILAYAH_ID='+d['MS_WILAYAH_ID'];
        if (d['MS_KODE_CABANG'])
            p +=   '&MS_KODE_CABANG='+d['MS_KODE_CABANG'];
        if (d['MS_KODE_UNIT'])
            p +=   '&MS_KODE_UNIT='+d['MS_KODE_UNIT'];
        if (d['PAGE'])
            p +=   '&PAGE='+d['PAGE'];
        if (d['LIMIT'])
            p +=   '&LIMIT='+d['LIMIT'];
        if (d['SEARCH'])
            p +=   '&SEARCH='+d['SEARCH'];
		

        apiData.get({
            gl      : true,
            api     : apiBase + 'proposal/get_proposallist/?'+p,
            scope   : $scope,
            sn      : 'listPS',
            type    : 'tolist',
            callbacksuccess : function(R){
//                $scope.fdPL.TOTAL_ITEMS = $scope.prospekList.length;
                $scope.listPS = R.data.data;
                $scope.fdPL.TOTAL_ITEMS = R.data.len;
            }
        });
    };
    
    $scope.$watchGroup(['fdPL.MS_WILAYAH_ID','fdPL.MS_KODE_CABANG','fdPL.MS_KODE_UNIT','fdPL.PAGE','fdPL.LIMIT','fdPL.SEARCH'], function(newValues, oldValues, scope) {
        if (newValues) {
            $scope.list({
                'MS_WILAYAH_ID'     : typeof ($scope.fdPL.MS_WILAYAH_ID)!='undefined' ? $scope.fdPL.MS_WILAYAH_ID : '',
                'MS_KODE_CABANG'    : typeof ($scope.fdPL.MS_KODE_CABANG)!='undefined' ? $scope.fdPL.MS_KODE_CABANG : '',
                'MS_KODE_UNIT'      : typeof ($scope.fdPL.MS_KODE_UNIT)!='undefined' ? $scope.fdPL.MS_KODE_UNIT : '',
                'PAGE'              : typeof ($scope.fdPL.PAGE)!='undefined' ? $scope.fdPL.PAGE : '',
                'LIMIT'             : typeof ($scope.fdPL.LIMIT)!='undefined' ? $scope.fdPL.LIMIT : '',
                'SEARCH'            : typeof ($scope.fdPL.SEARCH)!='undefined' ? $scope.fdPL.SEARCH : ''
            });
        }
    });
    
    $scope.pageChanged = function(p){
        $scope.fdPL.PAGE = p;
    };
    

    
});

App.controller('proposalTrackingCtrl',function($scope,globalFunction,$filter,$stateParams,apiData,apiBase,$rootScope){
    
    $scope.fdPL = {};
    $scope.listPST = [];
    $scope.fdPL.PAGE = 1;
    $scope.fdPL.MAX_SIZE = 5;
    $scope.fdPL.LIMIT = 10;
//        $scope.fdPL.TOTAL_ITEMS = 100;
    
    $scope.list = function(d){
        var p = '';
        if (d['ID'])
            p +=   'DB_PROSPEK_ID='+d['ID'];
        if (d['PAGE'])
            p +=   '&PAGE='+d['PAGE'];
        if (d['LIMIT'])
            p +=   '&LIMIT='+d['LIMIT'];
        if (d['SEARCH'])
            p +=   '&SEARCH='+d['SEARCH'];
        apiData.get({
            gl      : true,
            api     : apiBase + 'proposal/get_proposalid/?'+p,
            scope   : $scope,
            sn      : 'listPST',
            type    : 'tolist',
            callbacksuccess : function(R){
                $scope.listPST = R.data.content;
                $scope.fdPL.TOTAL_ITEMS = R.data.len;
            }
        });
    };
    
    $scope.$watchGroup(['fdPL.PAGE','fdPL.LIMIT','fdPL.SEARCH'], function(newValues, oldValues, scope) {
        if (newValues) {
            $scope.list({
                'ID'                : typeof ($stateParams.id)!='undefined' ? $stateParams.id : '',
                'PAGE'              : typeof ($scope.fdPL.PAGE)!='undefined' ? $scope.fdPL.PAGE : '',
                'LIMIT'             : typeof ($scope.fdPL.LIMIT)!='undefined' ? $scope.fdPL.LIMIT : '',
                'SEARCH'            : typeof ($scope.fdPL.SEARCH)!='undefined' ? $scope.fdPL.SEARCH : ''
            });
        }
    });
    
    $scope.pageChanged = function(p){
        $scope.fdPL.PAGE = p;
    };
	
	/*FZL*/
	$scope.modalTracking = function (prospekid) {         

        var m = globalFunction.openModal('partials/modals/modal-tracking-proposal.html', 'modal-form', 'modalTrackingCtrl');           

        $rootScope.closemodalTracking = function () {
            m.close();
        };
    }; 
    
});

App.controller('syncDocQNAPCtrl',function($scope,globalFunction,$filter,$stateParams,apiData,apiBase,$rootScope,modalService){
    
    $scope.fdSNCQ = {};
    
    $scope.sync = function(id){
        modalService.showModal({}, {
            closeButtonText: 'Batal',
            actionButtonText: 'Sync',
            headerText: 'Sync FIle QNap',
            bodyText: 'Apakah anda yakin sync file proposal dengan id '+id+' ke Qnap ?'
        }).then(function (result) {
            $scope.fdSNCQ.DB_PROSPEK_ID = id;
            apiData.post({
                gl      : true,
                api     : apiBase+'globalclass/sync_doc_to_qnap',
                data    : $scope.fdSNCQ,
                scope   : $scope
            });
        });
    };
    
});

/*FZL*/
App.controller('modalTrackingCtrl', function ($sce, $rootScope, $scope, $stateParams,simapanBase, apiData, apiBase, $sessionStorage, jasperBase , globalFunction) {   
    
    $scope.getlistTrackingProposal = function(id){
        apiData.get({
            gl      : false,
            api     : simapanBase+'getTracking?DB_PROSPEK_ID='+id,
            scope   : $scope,
            sn      : 'listTrackingProposal',
            type    : 'tolist'
        });
    };
    $scope.getlistTrackingProposal($stateParams.id);	
	
	$scope.modalLPC = function(data){
		
		console.log(data);
		$rootScope.CATATAN_LACAK = data;
        
        var m = globalFunction.openModal('partials/modals/modal-trace-approval-catatan.html','modal-trace-approval-catatan modal-form','');
        
        $rootScope.closemodalLPC = function(){
            m.close();            
        };
        
    }; 
    
});

