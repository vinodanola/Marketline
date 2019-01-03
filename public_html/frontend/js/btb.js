/**
 * @author vdp
 * created on 2018
 */

(function () {
    'use strict';
    
    angular.module('App.BTB',[])
        .config(function($stateProvider,$urlRouterProvider) {
            $urlRouterProvider.when('/btb/:id/:info_id', '/btb/:id/:info_id/informasi');
            $stateProvider
                .state('btb', {
                    url: '/btb/:id/:info_id',
                    templateUrl: 'partials/btb/btb.html',
                    controller: 'btbCtrl',
                    data: {
                        pageTitle: 'BTB'
                    }
                })
                .state('btb.informasi', {
                    url: '/informasi',
                    templateUrl: 'partials/btb/btb-informasi.html',
                    controller: 'btbInformasiCtrl',
                    data: {
                        pageTitle: 'BTB - Informasi'
                    }
                })
                .state('btb.konstruksi', {
                    url: '/konstruksi',
                    templateUrl: 'partials/btb/btb-konstruksi.html',
                    controller: 'btbKonstruksiCtrl',
                    data: {
                        pageTitle: 'BTB - Konstruksi'
                    }
                })
                .state('btb.komponenbangunan', {
                    url: '/komponen-bangunan',
                    templateUrl: 'partials/btb/btb-komponen-bangunan.html',
                    controller: 'btbKomponenBangunanCtrl',
                    data: {
                        pageTitle: 'BTB - Komponen Bangunan'
                    }
                })
                .state('btb.biayalainlain', {
                    url: '/biaya-lain-lain',
                    templateUrl: 'partials/btb/btb-biaya-lain-lain.html',
                    controller: 'btbBiayaLainlainCtrl',
                    data: {
                        pageTitle: 'BTB - Biaya Lain-lain'
                    }
                })
                .state('btb.penyusutan', {
                    url: '/penyusutan',
                    templateUrl: 'partials/btb/btb-penyusutan.html',
                    controller: 'btbPenyusutanCtrl',
                    data: {
                        pageTitle: 'BTB - Penyusutan'
                    }
                })
                .state('btb.nilaipasarbangunan', {
                    url: '/nilai-pasar-bangunan',
                    templateUrl: 'partials/btb/btb-nilai-pasar-bangunan.html',
                    controller: 'btbNilaiPasarBangunanCtrl',
                    data: {
                        pageTitle: 'BTB - Nilai Pasar Bangunan'
                    }
                })
                .state('btb.saved', {
                    url: '/saved',
                    templateUrl: 'partials/btb/btb-saved.html',
                    data: {
                        pageTitle: 'BTB - Saved'
                    }
                });
        })
        .controller('btbCtrl', function($scope,apiData,apiBase,$http,globalFunction,$stateParams,modalService,$rootScope,$state){
            
            $state.go('btb.informasi');
            
            $scope.fdBTB = {};
            $scope.fdBTB.AGUNAN_ID = $stateParams.id;
            $scope.fdBTB.INFORMASI_ID = $stateParams.info_id;			
            $scope.fdBTB.INFLASI_ID = 1;
            $scope.fdBTB.INFLASI = 1.09755832251893;
            $scope.fdBTB.INFLASI_MATERIAL_PENDUKUNG = 1.15243623864488;
            $scope.fdBTB.TAHUN_PENILAIAN = '2019';
//            $scope.fdBTB.INDEX_KEMAHALAN = 1;
//            $scope.fdBTB.INDEX_KEMAHALAN_ID = 1;
//            $scope.fdBTB.KONSTRUKSI_HARGA_TOTAL = 0;
//            $scope.fdBTB.BASEMENT_HARGA_TOTAL = 0;
            $scope.fdBTB.BIAYA_IMB_PERMETER = 20;
            
            
            
            
            $scope.formKonstruksi = [0];
            $scope.formBasement = [0];
            $scope.formRangkaAtap = [0];
            $scope.formPenutupAtap = [0];
            $scope.formDindingMaterialUtama = [0];
            $scope.formDindingMaterialPendukung = [0];
            $scope.formPintuJendela = [0];
            $scope.formLangitLangit = [0];
            $scope.formLantai = [0];
            $scope.formSanitasi = [0];
            $scope.formInstalasiListrik = [0];
            
            $scope.fdBTB.LOCK_INFORMASI = 0;
            $scope.fdBTB.LOCK_KONSTRUKSI = 0;
            $scope.fdBTB.LOCK_KOMPONEN_BANGUNAN = 0;
            $scope.fdBTB.LOCK_NILAI_BANGUNAN_PERMETER = 0;
            $scope.fdBTB.LOCK_BIAYA_LANGSUNG = 0;
            $scope.fdBTB.LOCK_BIAYA_TIDAK_LANGSUNG = 0;
            $scope.fdBTB.LOCK_PENYUSUTAN = 0;
            $scope.fdBTB.LOCK_NILAI_PASAR_BANGUNAN = 0;
            
            
        
            $scope.addForm = function(d){
                $scope[d.formName].push(window.Math.max.apply(null, $scope[d.formName]) + 1);
            };
        
            $scope.removeForm = function(d){
                if ($scope[d.formName].length > 1){
                    var array = $scope[d.formName];
                    
                    var index = array.indexOf(d.id);
                    if (index > -1) {
                      array.splice(index, 1);
                    }
                    
                    delete $scope.fdBTB[d.objectName][d.id];
                }
            };
            
                        
            $scope.get_kombinasi = function(d){
                $http({
                    method  : "GET",
                    url     : apiBase+'btb/get_kombinasi/?KATEGORI_ID='+d['KATEGORI_ID']+'&TIPE_BANGUNAN_ID='+d['TIPE_BANGUNAN_ID']+'&JENIS_BANGUNAN_ID='+d['JENIS_BANGUNAN_ID']+'&MATERIAL_ID='+d['MATERIAL_ID'],
                    dataType: 'json',
                    headers : { 'Content-Type':'application/json' },
                }).then(function mySuccess(R) {

                    d['callback'](R.data,d['x']);

                }, function myError(R) { 
                    console.log(R.statusText);  
                    globalFunction.ag('danger',[R]); 
                    if (d['gl']) globalFunction.closeModalLoading();
                });
            };
            
            
            $scope.get_parameter = function(d){
                $http({
                    method  : "GET",
                    url     : apiBase+'btb/get_parameter/?id='+d['AGUNAN_ID'],
                    dataType: 'json',
                    headers : { 'Content-Type':'application/json' },
                }).then(function mySuccess(R) {
                    
                    $scope.fdBTB.INDEX_KEMAHALAN = R.data[0].NILAI_INDEX_KEMAHALAN;
                    $scope.fdBTB.INDEX_KEMAHALAN_ID = R.data[0].INDEX_KEMAHALAN_ID;
                                       
                }, function myError(R) { 
                    console.log(R.statusText);  
                    globalFunction.ag('danger',[R]); 
                    if (d['gl']) globalFunction.closeModalLoading();
                });
            };
            
            $scope.get_parameter({
                AGUNAN_ID : $scope.fdBTB.AGUNAN_ID
            });
            
            $scope.calculateInformasi = function(){
//                if (!$scope.formValid())
//                    return false;
                
                $scope.fdBTB.LOCK_INFORMASI = 1;
                $state.go('btb.konstruksi');
            };
            
            $scope.editInformasi = function(){
                $scope.fdBTB.LOCK_INFORMASI = 0;
                $scope.fdBTB.LOCK_KONSTRUKSI = 0;
                $scope.fdBTB.LOCK_KOMPONEN_BANGUNAN = 0;
                $scope.fdBTB.LOCK_NILAI_BANGUNAN_PERMETER = 0;
                $scope.fdBTB.LOCK_BIAYA_LANGSUNG = 0;
                $scope.fdBTB.LOCK_BIAYA_TIDAK_LANGSUNG = 0;
                $scope.fdBTB.LOCK_PENYUSUTAN = 0;
                $scope.fdBTB.LOCK_NILAI_PASAR_BANGUNAN = 0;
            };
            
            $scope.calculateKonstruksi = function(){
                
                $scope.fdBTB.KONSTRUKSI_HARGA_TOTAL = 0; 
                $scope.fdBTB.BASEMENT_HARGA_TOTAL = 0;
                
                for (var x in $scope.fdBTB.KONSTRUKSI){
                    if (typeof $scope.fdBTB.KONSTRUKSI[x] !== 'function') {
                        $scope.get_kombinasi({
                            KATEGORI_ID         : 1,
                            TIPE_BANGUNAN_ID    : $scope.fdBTB.TIPE_BANGUNAN_ID,
                            JENIS_BANGUNAN_ID   : $scope.fdBTB.JENIS_BANGUNAN_ID,
                            MATERIAL_ID         : $scope.fdBTB.KONSTRUKSI[x].MATERIAL_ID,
                            x                   : x,
                            callback            : function(R,x) {
                                
                                $scope.fdBTB.KONSTRUKSI[x].KOMBINASI_ID = R[0].KOMBINASI_ID;
                                $scope.fdBTB.KONSTRUKSI[x].KATEGORI_ID = R[0].KATEGORI_ID;
                                $scope.fdBTB.KONSTRUKSI[x].NILAI_LANTAI = R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN];
                                
                                $scope.fdBTB.KONSTRUKSI[x].HARGA = $scope.fdBTB.INDEX_KEMAHALAN * R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN] * $scope.fdBTB.KONSTRUKSI[x].VOL / 100 * $scope.fdBTB.INFLASI;
                                console.log("DETAIL ",$scope.fdBTB.INDEX_KEMAHALAN +' * '+ R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN] +' * '+ $scope.fdBTB.KONSTRUKSI[x].VOL / 100 +'*'+ $scope.fdBTB.INFLASI);
                                $scope.fdBTB.KONSTRUKSI_HARGA_TOTAL = $scope.fdBTB.KONSTRUKSI_HARGA_TOTAL + $scope.fdBTB.KONSTRUKSI[x].HARGA;
                            }
                        });
                    }
                }
                
                for (var x in $scope.fdBTB.BASEMENT){
                    if (typeof $scope.fdBTB.BASEMENT[x] !== 'function') {
                        $scope.get_kombinasi({
                            KATEGORI_ID         : 2,
                            TIPE_BANGUNAN_ID    : $scope.fdBTB.TIPE_BANGUNAN_ID,
                            JENIS_BANGUNAN_ID   : $scope.fdBTB.JENIS_BANGUNAN_ID,
                            MATERIAL_ID         : $scope.fdBTB.BASEMENT[x].MATERIAL_ID,
                            x                   : x,
                            callback            : function(R,x) {
                                
                                $scope.fdBTB.BASEMENT[x].KOMBINASI_ID = R[0].KOMBINASI_ID;
                                $scope.fdBTB.BASEMENT[x].KATEGORI_ID = R[0].KATEGORI_ID;
                                $scope.fdBTB.BASEMENT[x].NILAI_LANTAI = R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN];
                                
                                $scope.fdBTB.BASEMENT[x].HARGA = $scope.fdBTB.INDEX_KEMAHALAN * R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN] * $scope.fdBTB.BASEMENT[x].VOL / 100 * $scope.fdBTB.INFLASI;
                                $scope.fdBTB.BASEMENT_HARGA_TOTAL = $scope.fdBTB.BASEMENT_HARGA_TOTAL + $scope.fdBTB.BASEMENT[x].HARGA;
                            }
                        });
                    }
                }
                
                $scope.fdBTB.LOCK_KONSTRUKSI = 1;
                $state.go('btb.komponenbangunan');
                
                return true;
            };
            
            $scope.editKonstruksi = function(){
                $scope.fdBTB.LOCK_KONSTRUKSI = 0;
                $scope.fdBTB.LOCK_KOMPONEN_BANGUNAN = 0;
                $scope.fdBTB.LOCK_NILAI_BANGUNAN_PERMETER = 0;
                $scope.fdBTB.LOCK_BIAYA_LANGSUNG = 0;
                $scope.fdBTB.LOCK_BIAYA_TIDAK_LANGSUNG = 0;
                $scope.fdBTB.LOCK_PENYUSUTAN = 0;
                $scope.fdBTB.LOCK_NILAI_PASAR_BANGUNAN = 0;
            };
            
            $scope.calculateKomponenBangunan = function(){
                
                
                $scope.fdBTB.RANGKA_ATAP_HARGA_TOTAL = 0;
                $scope.fdBTB.PENUTUP_ATAP_HARGA_TOTAL = 0;
                $scope.fdBTB.PENUTUP_ATAP_SCORING_TOTAL = 0;
                $scope.fdBTB.DINDING_MATERIAL_UTAMA_HARGA_TOTAL = 0;
                $scope.fdBTB.DINDING_MATERIAL_PENDUKUNG_HARGA_TOTAL = 0;
                $scope.fdBTB.PINTU_JENDELA_HARGA_TOTAL = 0;
                $scope.fdBTB.PINTU_JENDELA_SCORING_TOTAL = 0;
                $scope.fdBTB.LANGIT_LANGIT_HARGA_TOTAL = 0;
                $scope.fdBTB.LANGIT_LANGIT_SCORING_TOTAL = 0;
                $scope.fdBTB.LANTAI_HARGA_TOTAL = 0;
                $scope.fdBTB.LANTAI_SCORING_TOTAL = 0;
                $scope.fdBTB.SANITASI_HARGA_TOTAL = 0;
                $scope.fdBTB.INSTALASI_LISTRIK_HARGA_TOTAL = 0;
                
                for (var x in $scope.fdBTB.RANGKA_ATAP){
                    if (typeof $scope.fdBTB.RANGKA_ATAP[x] !== 'function') {
                        $scope.get_kombinasi({
                            KATEGORI_ID         : 3,
                            TIPE_BANGUNAN_ID    : $scope.fdBTB.TIPE_BANGUNAN_ID,
                            JENIS_BANGUNAN_ID   : $scope.fdBTB.JENIS_BANGUNAN_ID,
                            MATERIAL_ID         : $scope.fdBTB.RANGKA_ATAP[x].MATERIAL_ID,
                            x                   : x,
                            callback            : function(R,x) {
                                
                                $scope.fdBTB.RANGKA_ATAP[x].KOMBINASI_ID = R[0].KOMBINASI_ID;
                                $scope.fdBTB.RANGKA_ATAP[x].KATEGORI_ID = R[0].KATEGORI_ID;
                                $scope.fdBTB.RANGKA_ATAP[x].NILAI_LANTAI = R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN];
                                
                                $scope.fdBTB.RANGKA_ATAP[x].HARGA = $scope.fdBTB.INDEX_KEMAHALAN * R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN] * $scope.fdBTB.RANGKA_ATAP[x].VOL / 100 * $scope.fdBTB.INFLASI;
                                $scope.fdBTB.RANGKA_ATAP_HARGA_TOTAL = $scope.fdBTB.RANGKA_ATAP_HARGA_TOTAL + $scope.fdBTB.RANGKA_ATAP[x].HARGA;
                            }
                        });
                    }
                }
                
                for (var x in $scope.fdBTB.PENUTUP_ATAP){
                    if (typeof $scope.fdBTB.PENUTUP_ATAP[x] !== 'function') {
                        $scope.get_kombinasi({
                            KATEGORI_ID         : 4,
                            TIPE_BANGUNAN_ID    : 'NULL',
                            JENIS_BANGUNAN_ID   : 'NULL',
                            MATERIAL_ID         : $scope.fdBTB.PENUTUP_ATAP[x].MATERIAL_ID,
                            x                   : x,
                            callback            : function(R,x) {
                                
                                $scope.fdBTB.PENUTUP_ATAP[x].KOMBINASI_ID = R[0].KOMBINASI_ID;
                                $scope.fdBTB.PENUTUP_ATAP[x].KATEGORI_ID = R[0].KATEGORI_ID;
                                $scope.fdBTB.PENUTUP_ATAP[x].NILAI_LANTAI = R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN];
                                
                                $scope.fdBTB.PENUTUP_ATAP[x].HARGA = $scope.fdBTB.INDEX_KEMAHALAN * R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN] * $scope.fdBTB.PENUTUP_ATAP[x].VOL / 100 * $scope.fdBTB.INFLASI;
                                $scope.fdBTB.PENUTUP_ATAP[x].SCORING = $scope.fdBTB.PENUTUP_ATAP[x].KONVERSI * $scope.fdBTB.PENUTUP_ATAP[x].VOL / 100;
                                $scope.fdBTB.PENUTUP_ATAP_HARGA_TOTAL = $scope.fdBTB.PENUTUP_ATAP_HARGA_TOTAL + $scope.fdBTB.PENUTUP_ATAP[x].HARGA;
                                $scope.fdBTB.PENUTUP_ATAP_SCORING_TOTAL = $scope.fdBTB.PENUTUP_ATAP_SCORING_TOTAL + $scope.fdBTB.PENUTUP_ATAP[x].SCORING;
                                console.log('PENUTUP_ATAP_SCORING_TOTAL',x);
                            }
                        });
                    }
                }
                
                for (var x in $scope.fdBTB.DINDING_MATERIAL_UTAMA){
                    if (typeof $scope.fdBTB.DINDING_MATERIAL_UTAMA[x] !== 'function') {
                        $scope.get_kombinasi({
                            KATEGORI_ID         : 5,
                            TIPE_BANGUNAN_ID    : $scope.fdBTB.TIPE_BANGUNAN_ID,
                            JENIS_BANGUNAN_ID   : $scope.fdBTB.JENIS_BANGUNAN_ID,
                            MATERIAL_ID         : $scope.fdBTB.DINDING_MATERIAL_UTAMA[x].MATERIAL_ID,
                            x                   : x,
                            callback            : function(R,x) {
                                
                                $scope.fdBTB.DINDING_MATERIAL_UTAMA[x].KOMBINASI_ID = R[0].KOMBINASI_ID;
                                $scope.fdBTB.DINDING_MATERIAL_UTAMA[x].KATEGORI_ID = R[0].KATEGORI_ID;
                                $scope.fdBTB.DINDING_MATERIAL_UTAMA[x].NILAI_LANTAI = R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN];
                                
                                $scope.fdBTB.DINDING_MATERIAL_UTAMA[x].HARGA = $scope.fdBTB.INDEX_KEMAHALAN * R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN] * $scope.fdBTB.DINDING_MATERIAL_UTAMA[x].VOL / 100 * $scope.fdBTB.INFLASI;
                                $scope.fdBTB.DINDING_MATERIAL_UTAMA_HARGA_TOTAL = $scope.fdBTB.DINDING_MATERIAL_UTAMA_HARGA_TOTAL + $scope.fdBTB.DINDING_MATERIAL_UTAMA[x].HARGA;
                            
                                $scope.fdBTB.DINDING_MATERIAL_UTAMA[x].FLAG = 'UTAMA';
                            }
                        });
                    }
                }
                
                for (var x in $scope.fdBTB.DINDING_MATERIAL_PENDUKUNG){
                    if (typeof $scope.fdBTB.DINDING_MATERIAL_PENDUKUNG[x] !== 'function') {
                        $scope.get_kombinasi({
                            KATEGORI_ID         : 5,
                            TIPE_BANGUNAN_ID    : $scope.fdBTB.TIPE_BANGUNAN_ID,
                            JENIS_BANGUNAN_ID   : $scope.fdBTB.JENIS_BANGUNAN_ID,
                            MATERIAL_ID         : $scope.fdBTB.DINDING_MATERIAL_PENDUKUNG[x].MATERIAL_ID,
                            x                   : x,
                            callback            : function(R,x) {
                                
                                $scope.fdBTB.DINDING_MATERIAL_PENDUKUNG[x].KOMBINASI_ID = R[0].KOMBINASI_ID;
                                $scope.fdBTB.DINDING_MATERIAL_PENDUKUNG[x].KATEGORI_ID = R[0].KATEGORI_ID;
                                $scope.fdBTB.DINDING_MATERIAL_PENDUKUNG[x].NILAI_LANTAI = R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN];
                                
                                $scope.fdBTB.DINDING_MATERIAL_PENDUKUNG[x].HARGA = $scope.fdBTB.INDEX_KEMAHALAN * R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN] * $scope.fdBTB.DINDING_MATERIAL_PENDUKUNG[x].VOL / 100 * $scope.fdBTB.INFLASI_MATERIAL_PENDUKUNG;
                                $scope.fdBTB.DINDING_MATERIAL_PENDUKUNG_HARGA_TOTAL = $scope.fdBTB.DINDING_MATERIAL_PENDUKUNG_HARGA_TOTAL + $scope.fdBTB.DINDING_MATERIAL_PENDUKUNG[x].HARGA;
                            
                                $scope.fdBTB.DINDING_MATERIAL_PENDUKUNG[x].FLAG = 'PENDUKUNG';
                            }
                        });
                    }
                }
                
                for (var x in $scope.fdBTB.PINTU_JENDELA){
                    if (typeof $scope.fdBTB.PINTU_JENDELA[x] !== 'function') {
                        $scope.get_kombinasi({
                            KATEGORI_ID         : 6,
                            TIPE_BANGUNAN_ID    : $scope.fdBTB.TIPE_BANGUNAN_ID,
                            JENIS_BANGUNAN_ID   : $scope.fdBTB.JENIS_BANGUNAN_ID,
                            MATERIAL_ID         : $scope.fdBTB.PINTU_JENDELA[x].MATERIAL_ID,
                            x                   : x,
                            callback            : function(R,x) {
                                
                                $scope.fdBTB.PINTU_JENDELA[x].KOMBINASI_ID = R[0].KOMBINASI_ID;
                                $scope.fdBTB.PINTU_JENDELA[x].KATEGORI_ID = R[0].KATEGORI_ID;
                                $scope.fdBTB.PINTU_JENDELA[x].NILAI_LANTAI = R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN];
                                
                                $scope.fdBTB.PINTU_JENDELA[x].HARGA = $scope.fdBTB.INDEX_KEMAHALAN * R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN] * $scope.fdBTB.PINTU_JENDELA[x].VOL / 100 * $scope.fdBTB.INFLASI;
                                
                                $scope.fdBTB.PINTU_JENDELA[x].SCORING = $scope.fdBTB.PINTU_JENDELA[x].KONVERSI * $scope.fdBTB.PINTU_JENDELA[x].VOL / 100;
                                $scope.fdBTB.PINTU_JENDELA_HARGA_TOTAL = $scope.fdBTB.PINTU_JENDELA_HARGA_TOTAL + $scope.fdBTB.PINTU_JENDELA[x].HARGA;
                                $scope.fdBTB.PINTU_JENDELA_SCORING_TOTAL = $scope.fdBTB.PINTU_JENDELA_SCORING_TOTAL + $scope.fdBTB.PINTU_JENDELA[x].SCORING;
                            }
                        });
                    }
                }
                
                for (var x in $scope.fdBTB.LANGIT_LANGIT){
                    if (typeof $scope.fdBTB.LANGIT_LANGIT[x] !== 'function') {
                        $scope.get_kombinasi({
                            KATEGORI_ID         : 7,
                            TIPE_BANGUNAN_ID    : 'NULL',
                            JENIS_BANGUNAN_ID   : 'NULL',
                            MATERIAL_ID         : $scope.fdBTB.LANGIT_LANGIT[x].MATERIAL_ID,
                            x                   : x,
                            callback            : function(R,x) {
                                
                                $scope.fdBTB.LANGIT_LANGIT[x].KOMBINASI_ID = R[0].KOMBINASI_ID;
                                $scope.fdBTB.LANGIT_LANGIT[x].KATEGORI_ID = R[0].KATEGORI_ID;
                                $scope.fdBTB.LANGIT_LANGIT[x].NILAI_LANTAI = R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN];
                                
                                $scope.fdBTB.LANGIT_LANGIT[x].HARGA = $scope.fdBTB.INDEX_KEMAHALAN * R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN] * $scope.fdBTB.LANGIT_LANGIT[x].VOL / 100 * $scope.fdBTB.INFLASI;
                                
                                $scope.fdBTB.LANGIT_LANGIT[x].SCORING = $scope.fdBTB.LANGIT_LANGIT[x].KONVERSI * $scope.fdBTB.LANGIT_LANGIT[x].VOL / 100;
                                $scope.fdBTB.LANGIT_LANGIT_HARGA_TOTAL = $scope.fdBTB.LANGIT_LANGIT_HARGA_TOTAL + $scope.fdBTB.LANGIT_LANGIT[x].HARGA;
                                $scope.fdBTB.LANGIT_LANGIT_SCORING_TOTAL = $scope.fdBTB.LANGIT_LANGIT_SCORING_TOTAL + $scope.fdBTB.LANGIT_LANGIT[x].SCORING;
                            }
                        });
                    }
                }
                
                for (var x in $scope.fdBTB.LANTAI){
                    if (typeof $scope.fdBTB.LANGIT_LANGIT[x] !== 'function') {
                        $scope.get_kombinasi({
                            KATEGORI_ID         : 8,
                            TIPE_BANGUNAN_ID    : 'NULL',
                            JENIS_BANGUNAN_ID   : 'NULL',
                            MATERIAL_ID         : $scope.fdBTB.LANTAI[x].MATERIAL_ID,
                            x                   : x,
                            callback            : function(R,x) {
                                
                                $scope.fdBTB.LANTAI[x].KOMBINASI_ID = R[0].KOMBINASI_ID;
                                $scope.fdBTB.LANTAI[x].KATEGORI_ID = R[0].KATEGORI_ID;
                                $scope.fdBTB.LANTAI[x].NILAI_LANTAI = R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN];
                                
                                $scope.fdBTB.LANTAI[x].HARGA = $scope.fdBTB.INDEX_KEMAHALAN * R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN] * $scope.fdBTB.LANTAI[x].VOL / 100 * $scope.fdBTB.INFLASI;
                                
                                $scope.fdBTB.LANTAI[x].SCORING = $scope.fdBTB.LANTAI[x].KONVERSI * $scope.fdBTB.LANTAI[x].VOL / 100;
                                $scope.fdBTB.LANTAI_HARGA_TOTAL = $scope.fdBTB.LANTAI_HARGA_TOTAL + $scope.fdBTB.LANTAI[x].HARGA;
                                $scope.fdBTB.LANTAI_SCORING_TOTAL = $scope.fdBTB.LANTAI_SCORING_TOTAL + $scope.fdBTB.LANTAI[x].SCORING;
                            }
                        });
                    }
                }
                
                for (var x in $scope.fdBTB.SANITASI){
                    if (typeof $scope.fdBTB.SANITASI[x] !== 'function') {
                        $scope.get_kombinasi({
                            KATEGORI_ID         : 9,
                            TIPE_BANGUNAN_ID    : $scope.fdBTB.TIPE_BANGUNAN_ID,
                            JENIS_BANGUNAN_ID   : $scope.fdBTB.JENIS_BANGUNAN_ID,
                            MATERIAL_ID         : 'NULL',
                            x                   : x,
                            callback            : function(R,x) {
                                
                                $scope.fdBTB.SANITASI[x].KOMBINASI_ID = R[0].KOMBINASI_ID;
                                $scope.fdBTB.SANITASI[x].KATEGORI_ID = R[0].KATEGORI_ID;
                                $scope.fdBTB.SANITASI[x].NILAI_LANTAI = R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN];
                                
                                $scope.fdBTB.SANITASI[x].HARGA = $scope.fdBTB.INDEX_KEMAHALAN * R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN] * $scope.fdBTB.SANITASI[x].VOL / 100 * $scope.fdBTB.INFLASI;
                                $scope.fdBTB.SANITASI_HARGA_TOTAL = $scope.fdBTB.SANITASI_HARGA_TOTAL + $scope.fdBTB.SANITASI[x].HARGA;
                            }
                        });
                    }
                }
                
                for (var x in $scope.fdBTB.INSTALASI_LISTRIK){
                    if (typeof $scope.fdBTB.INSTALASI_LISTRIK[x] !== 'function') {
                        $scope.get_kombinasi({
                            KATEGORI_ID         : 10,
                            TIPE_BANGUNAN_ID    : $scope.fdBTB.TIPE_BANGUNAN_ID,
                            JENIS_BANGUNAN_ID   : $scope.fdBTB.JENIS_BANGUNAN_ID,
                            MATERIAL_ID         : 'NULL',
                            x                   : x,
                            callback            : function(R,x) {
                                
                                $scope.fdBTB.INSTALASI_LISTRIK[x].KOMBINASI_ID = R[0].KOMBINASI_ID;
                                $scope.fdBTB.INSTALASI_LISTRIK[x].KATEGORI_ID = R[0].KATEGORI_ID;
                                $scope.fdBTB.INSTALASI_LISTRIK[x].NILAI_LANTAI = R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN];
                                
                                $scope.fdBTB.INSTALASI_LISTRIK[x].HARGA = $scope.fdBTB.INDEX_KEMAHALAN * R[0]['LANTAI_'+$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN] * $scope.fdBTB.INSTALASI_LISTRIK[x].VOL / 100 * $scope.fdBTB.INFLASI;
                                $scope.fdBTB.INSTALASI_LISTRIK_HARGA_TOTAL = $scope.fdBTB.INSTALASI_LISTRIK_HARGA_TOTAL + $scope.fdBTB.INSTALASI_LISTRIK[x].HARGA;
                            }
                        });
                    }
                }
                
                $scope.fdBTB.LOCK_KOMPONEN_BANGUNAN = 1;
                
                
                return true;
                
            };
            
            $scope.editKomponenBangunan = function(){
                console.log('Edit komponen bangunan');
                $scope.fdBTB.LOCK_KOMPONEN_BANGUNAN = 0;
                $scope.fdBTB.LOCK_NILAI_BANGUNAN_PERMETER = 0;
                $scope.fdBTB.LOCK_BIAYA_LANGSUNG = 0;
                $scope.fdBTB.LOCK_BIAYA_TIDAK_LANGSUNG = 0;
                $scope.fdBTB.LOCK_PENYUSUTAN = 0;
                $scope.fdBTB.LOCK_NILAI_PASAR_BANGUNAN = 0;
            };
            
            $scope.calculateNilaiBangunanPerMeter = function(){
                
                
                
                //Perhitungan Scoring
                $scope.fdBTB.PERHITUNGAN_SCORING = 
                        ($scope.fdBTB.PENUTUP_ATAP_SCORING_TOTAL * 30 / 100) +
                        ($scope.fdBTB.PINTU_JENDELA_SCORING_TOTAL * 30 / 100) +
                        ($scope.fdBTB.LANGIT_LANGIT_SCORING_TOTAL * 30 / 100) +
                        ($scope.fdBTB.LANTAI_SCORING_TOTAL * 30 / 100);
                
                console.log('PERHITUNGAN SCORING',$scope.fdBTB.PERHITUNGAN_SCORING + ' = ' +
                        ($scope.fdBTB.PENUTUP_ATAP_SCORING_TOTAL * 30 / 100 )  + ' + ' +
                        ($scope.fdBTB.PINTU_JENDELA_SCORING_TOTAL * 30 / 100) + ' + ' +
                        ($scope.fdBTB.LANGIT_LANGIT_SCORING_TOTAL * 30 / 100 ) + ' + ' +
                        ($scope.fdBTB.LANTAI_SCORING_TOTAL * 30 / 100 )
                    );
                
//                $scope.fdBTB.KELAS_MATERIAL_SCORING = $scope.fdBTB.PERHITUNGAN_SCORING >= 25 ? 1 : ($scope.fdBTB.PERHITUNGAN_SCORING >= 19 && $scope.fdBTB.PERHITUNGAN_SCORING < 25) ? 2 : $scope.fdBTB.PERHITUNGAN_SCORING < 19 ? 3 : 'undefined';
                
                $scope.fdBTB.KELAS_MATERIAL_SCORING = Math.round($scope.fdBTB.PERHITUNGAN_SCORING) >= 25 ? 1 : (Math.round($scope.fdBTB.PERHITUNGAN_SCORING) >= 19 && Math.round($scope.fdBTB.PERHITUNGAN_SCORING) < 25) ? 2 : 3;
                
                console.log('KELAS MATERIAL SCORING',$scope.fdBTB.KELAS_MATERIAL_SCORING);
                console.log('TIPE BANGUNAN SKOR',$scope.fdBTB.TIPE_BANGUNAN_SKOR);
                
                $scope.fdBTB.DB_LUAS_BANGUNAN_TYPE = $scope.fdBTB.DB_LUAS_BANGUNAN < 75 ? 3 : ($scope.fdBTB.DB_LUAS_BANGUNAN >= 75 && $scope.fdBTB.DB_LUAS_BANGUNAN < 250) ? 2 : ($scope.fdBTB.DB_LUAS_BANGUNAN >= 250) ? 1 : 'error';
                
                $scope.fdBTB.VALIDASI_1 = 
                        ($scope.fdBTB.KELAS_MATERIAL_SCORING == 1 && $scope.fdBTB.TIPE_BANGUNAN_SKOR >= 1) ? 1 :
                        ($scope.fdBTB.KELAS_MATERIAL_SCORING == 2 && $scope.fdBTB.TIPE_BANGUNAN_SKOR >= 2) ? 1 :
                        ($scope.fdBTB.KELAS_MATERIAL_SCORING == 3 && $scope.fdBTB.TIPE_BANGUNAN_SKOR >= 3) ? 1 :
                        ($scope.fdBTB.KELAS_MATERIAL_SCORING == 'X' && $scope.fdBTB.TIPE_BANGUNAN_SKOR < $scope.fdBTB.KELAS_MATERIAL_SCORING) ? 'error' : 'undefined';
                
                if ($scope.fdBTB.VALIDASI_1 == 'error' || $scope.fdBTB.VALIDASI_1 == 'undefined')
                    globalFunction.ag('danger',['Validasi 1 tidak lolos']);
                
                console.log('VALIDASI_1',$scope.fdBTB.VALIDASI_1);
                
                $scope.fdBTB.VALIDASI_2 = 
                        ($scope.fdBTB.DB_LUAS_BANGUNAN_TYPE == 1 && $scope.fdBTB.TIPE_BANGUNAN_SKOR >= 1) ? 1 :
                        ($scope.fdBTB.DB_LUAS_BANGUNAN_TYPE == 2 && $scope.fdBTB.TIPE_BANGUNAN_SKOR >= 2) ? 1 :
                        ($scope.fdBTB.DB_LUAS_BANGUNAN_TYPE == 3 && $scope.fdBTB.TIPE_BANGUNAN_SKOR >= 3) ? 1 :
                        ($scope.fdBTB.DB_LUAS_BANGUNAN_TYPE == 'X' && $scope.fdBTB.TIPE_BANGUNAN_SKOR < $scope.fdBTB.DB_LUAS_BANGUNAN_TYPE) ? 'error' : 'undefined';
                
                if ($scope.fdBTB.VALIDASI_2 == 'error' || $scope.fdBTB.VALIDASI_2 == 'undefined')
                    globalFunction.ag('danger',['Validasi 2 tidak lolos']);
                
                console.log('VALIDASI_2',$scope.fdBTB.VALIDASI_2);
                
                $scope.fdBTB.TOTAL_HARGA_BANGUNAN_PER_METER_PERSEGI = ($scope.fdBTB.KONSTRUKSI_HARGA_TOTAL + 
                        $scope.fdBTB.BASEMENT_HARGA_TOTAL +
                        $scope.fdBTB.RANGKA_ATAP_HARGA_TOTAL +
                        $scope.fdBTB.PENUTUP_ATAP_HARGA_TOTAL +
                        $scope.fdBTB.DINDING_MATERIAL_UTAMA_HARGA_TOTAL + 
                        $scope.fdBTB.DINDING_MATERIAL_PENDUKUNG_HARGA_TOTAL +
                        $scope.fdBTB.PINTU_JENDELA_HARGA_TOTAL + 
                        $scope.fdBTB.LANGIT_LANGIT_HARGA_TOTAL +
                        $scope.fdBTB.LANTAI_HARGA_TOTAL +
                        $scope.fdBTB.SANITASI_HARGA_TOTAL +
                        $scope.fdBTB.INSTALASI_LISTRIK_HARGA_TOTAL) * $scope.fdBTB.VALIDASI_1 * $scope.fdBTB.VALIDASI_2;
                
                console.log('TOTAL_HARGA_BANGUNAN_PER_METER_PERSEGI',$scope.fdBTB.TOTAL_HARGA_BANGUNAN_PER_METER_PERSEGI + ' = ' + 
                        ($scope.fdBTB.KONSTRUKSI_HARGA_TOTAL + ' + ' + 
                        $scope.fdBTB.BASEMENT_HARGA_TOTAL + ' + ' + 
                        $scope.fdBTB.RANGKA_ATAP_HARGA_TOTAL + ' + ' + 
                        $scope.fdBTB.PENUTUP_ATAP_HARGA_TOTAL + ' + ' + 
                        $scope.fdBTB.DINDING_MATERIAL_UTAMA_HARGA_TOTAL + ' + ' +  
                        $scope.fdBTB.DINDING_MATERIAL_PENDUKUNG_HARGA_TOTAL + ' + ' + 
                        $scope.fdBTB.PINTU_JENDELA_HARGA_TOTAL + ' + ' + 
                        $scope.fdBTB.LANGIT_LANGIT_HARGA_TOTAL + ' + ' + 
                        $scope.fdBTB.LANTAI_HARGA_TOTAL + ' + ' + 
                        $scope.fdBTB.SANITASI_HARGA_TOTAL + ' + ' + 
                        $scope.fdBTB.INSTALASI_LISTRIK_HARGA_TOTAL) + ' * ' +  $scope.fdBTB.VALIDASI_1 + ' * ' +  $scope.fdBTB.VALIDASI_2
                        );
                
                $scope.fdBTB.LOCK_NILAI_BANGUNAN_PERMETER = 1;
                $state.go('btb.biayalainlain');
                
                return true;
            };
            
            $scope.editNilaiBangunanPerMeter = function(){
                $scope.fdBTB.LOCK_NILAI_BANGUNAN_PERMETER = 0;
                $scope.fdBTB.LOCK_BIAYA_LANGSUNG = 0;
                $scope.fdBTB.LOCK_BIAYA_TIDAK_LANGSUNG = 0;
                $scope.fdBTB.LOCK_PENYUSUTAN = 0;
                $scope.fdBTB.LOCK_NILAI_PASAR_BANGUNAN = 0;
            };
            
            $scope.calculateBiayaLangsung = function(){
                
                
                
                $scope.fdBTB.BIAYA_LANGSUNG.OVERHEAD.NILAI = $scope.fdBTB.TOTAL_HARGA_BANGUNAN_PER_METER_PERSEGI * $scope.fdBTB.BIAYA_LANGSUNG.OVERHEAD.VOL / 100;
                $scope.fdBTB.BIAYA_LANGSUNG.FEE_KONSULTAN.NILAI = $scope.fdBTB.TOTAL_HARGA_BANGUNAN_PER_METER_PERSEGI * $scope.fdBTB.BIAYA_LANGSUNG.FEE_KONSULTAN.VOL / 100;
                $scope.fdBTB.BIAYA_LANGSUNG.BIAYA_KONSULTAN.NILAI = $scope.fdBTB.BIAYA_IMB_PERMETER * $scope.fdBTB.BIAYA_LANGSUNG.BIAYA_KONSULTAN.VOL / 100;
                
//                $scope.fdBTB.TOTAL_BIAYA_LANGSUNG = 
//                        ($scope.fdBTB.TOTAL_HARGA_BANGUNAN_PER_METER_PERSEGI * $scope.fdBTB.BIAYA_LANGSUNG.OVERHEAD.NILAI) +
//                        ($scope.fdBTB.TOTAL_HARGA_BANGUNAN_PER_METER_PERSEGI * $scope.fdBTB.BIAYA_LANGSUNG.FEE_KONSULTAN.NILAI) +
//                        ($scope.fdBTB.TOTAL_HARGA_BANGUNAN_PER_METER_PERSEGI * $scope.fdBTB.BIAYA_LANGSUNG.BIAYA_KONSULTAN.NILAI);
                
                $scope.fdBTB.TOTAL_BIAYA_LANGSUNG = $scope.fdBTB.BIAYA_LANGSUNG.OVERHEAD.NILAI +
                        $scope.fdBTB.BIAYA_LANGSUNG.FEE_KONSULTAN.NILAI +
                        $scope.fdBTB.BIAYA_LANGSUNG.BIAYA_KONSULTAN.NILAI;
                
                console.log("BIAYA LANGSUNG",$scope.fdBTB.BIAYA_LANGSUNG.OVERHEAD.NILAI + " + " +
                        $scope.fdBTB.BIAYA_LANGSUNG.FEE_KONSULTAN.NILAI + " + " +
                        $scope.fdBTB.BIAYA_LANGSUNG.BIAYA_KONSULTAN.NILAI);
                
                $scope.fdBTB.LOCK_BIAYA_LANGSUNG = 1;
                
                return true;
                
            };
            
            $scope.editBiayaLangsung = function(){
                $scope.fdBTB.LOCK_BIAYA_LANGSUNG = 0;
                $scope.fdBTB.LOCK_BIAYA_TIDAK_LANGSUNG = 0;
                $scope.fdBTB.LOCK_PENYUSUTAN = 0;
                $scope.fdBTB.LOCK_NILAI_PASAR_BANGUNAN = 0;
            };
            
            $scope.calculateBiayaTidakLangsung = function(){
                
                
                
                $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.PPN.NILAI = (($scope.fdBTB.TOTAL_HARGA_BANGUNAN_PER_METER_PERSEGI + $scope.fdBTB.TOTAL_BIAYA_LANGSUNG) * $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.PPN.VOL / 100) ;
                $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.BIAYA_KONSULTASI.NILAI = (($scope.fdBTB.TOTAL_HARGA_BANGUNAN_PER_METER_PERSEGI + $scope.fdBTB.TOTAL_BIAYA_LANGSUNG) * $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.BIAYA_KONSULTASI.VOL / 100);
                $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.IDC.NILAI = (($scope.fdBTB.TOTAL_HARGA_BANGUNAN_PER_METER_PERSEGI + $scope.fdBTB.TOTAL_BIAYA_LANGSUNG) * $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.IDC.VOL / 100);
                
//                $scope.fdBTB.TOTAL_BIAYA_TIDAK_LANGSUNG =
//                        (($scope.fdBTB.TOTAL_HARGA_BANGUNAN_PER_METER_PERSEGI + $scope.fdBTB.TOTAL_BIAYA_LANGSUNG) * $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.PPN.VOL / 100) +
//                        (($scope.fdBTB.TOTAL_HARGA_BANGUNAN_PER_METER_PERSEGI + $scope.fdBTB.TOTAL_BIAYA_LANGSUNG) * $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.BIAYA_KONSULTASI.VOL / 100) +
//                        (($scope.fdBTB.TOTAL_HARGA_BANGUNAN_PER_METER_PERSEGI + $scope.fdBTB.TOTAL_BIAYA_LANGSUNG) * $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.IDC.VOL / 100);
            
                $scope.fdBTB.TOTAL_BIAYA_TIDAK_LANGSUNG = $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.PPN.NILAI + 
                        $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.BIAYA_KONSULTASI.NILAI +
                        $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.IDC.NILAI;
                
                console.log("BIAYA LANGSUNG",$scope.fdBTB.BIAYA_TIDAK_LANGSUNG.PPN.NILAI + " + " + 
                        $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.BIAYA_KONSULTASI.NILAI + " + " +
                        $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.IDC.NILAI);
                
                $scope.fdBTB.LOCK_BIAYA_TIDAK_LANGSUNG = 1;
                $state.go('btb.penyusutan');
                
                return true;
            };
            
            $scope.editBiayaTidakLangsung = function(){
                $scope.fdBTB.LOCK_BIAYA_TIDAK_LANGSUNG = 0;
                $scope.fdBTB.LOCK_PENYUSUTAN = 0;
                $scope.fdBTB.LOCK_NILAI_PASAR_BANGUNAN = 0;
            };
            
            $scope.calculatePenyusutan = function(){
                
                
                
                $scope.fdBTB.PENYUSUTAN_KEMUNDURAN_FISIK = 
                        $scope.fdBTB.NILAI_EKONOMIS_UMUR_EFEKTIF_BANGUNAN > $scope.fdBTB.NILAI_EKONOMIS_UMUR_EKONOMIS_BANGUNAN ? 100 : 
                        ($scope.fdBTB.NILAI_EKONOMIS_UMUR_EFEKTIF_BANGUNAN / $scope.fdBTB.NILAI_EKONOMIS_UMUR_EKONOMIS_BANGUNAN) * 100;
                
                console.log('PENYUSUTAN_KEMUNDURAN_FISIK', 
                        $scope.fdBTB.NILAI_EKONOMIS_UMUR_EFEKTIF_BANGUNAN +' > '+ $scope.fdBTB.NILAI_EKONOMIS_UMUR_EKONOMIS_BANGUNAN +' ? '+ 100 + ' : ' + 
                        ($scope.fdBTB.NILAI_EKONOMIS_UMUR_EFEKTIF_BANGUNAN + ' / ' + $scope.fdBTB.NILAI_EKONOMIS_UMUR_EKONOMIS_BANGUNAN +' * '+ 100)
                    );
            
                
                
                $scope.fdBTB.PENYUSUTAN_KONDISI_TERLIHAT_B = $scope.fdBTB.PENYUSUTAN_KEMUNDURAN_FISIK > 100 ? 100 : ( 25 / 100 * $scope.fdBTB.PENYUSUTAN_KEMUNDURAN_FISIK ) >= $scope.fdBTB.PENYUSUTAN_KONDISI_TERLIHAT_A ? (-$scope.fdBTB.PENYUSUTAN_KONDISI_TERLIHAT_A) : 'error' ; 
                
                console.log('PENYUSUTAN_KONDISI_TERLIHAT_B', $scope.fdBTB.PENYUSUTAN_KONDISI_TERLIHAT_B);
                
                $scope.fdBTB.PENYUSUTAN_TOTAL_KEMUNDURAN_FISIK = ($scope.fdBTB.PENYUSUTAN_KEMUNDURAN_FISIK + $scope.fdBTB.PENYUSUTAN_KONDISI_TERLIHAT_B) > 100 ? 100 : ($scope.fdBTB.PENYUSUTAN_KEMUNDURAN_FISIK + $scope.fdBTB.PENYUSUTAN_KONDISI_TERLIHAT_B);
                
                console.log('PENYUSUTAN_TOTAL_KEMUNDURAN_FISIK', $scope.fdBTB.PENYUSUTAN_TOTAL_KEMUNDURAN_FISIK);
                
                $scope.fdBTB.PENYUSUTAN_KEUSANGAN_FUNGSIONAL_B = ( 100 - $scope.fdBTB.PENYUSUTAN_TOTAL_KEMUNDURAN_FISIK ) * $scope.fdBTB.PENYUSUTAN_KEUSANGAN_FUNGSIONAL_A / 100;
                
                console.log('PENYUSUTAN_KEUSANGAN_FUNGSIONAL_B', $scope.fdBTB.PENYUSUTAN_KEUSANGAN_FUNGSIONAL_B);
                
                $scope.fdBTB.PENYUSUTAN_KEUSANGAN_EKONOMIS_B = ( 100 - $scope.fdBTB.PENYUSUTAN_TOTAL_KEMUNDURAN_FISIK ) * $scope.fdBTB.PENYUSUTAN_KEUSANGAN_EKONOMIS_A / 100;
                
                console.log('PENYUSUTAN_KEUSANGAN_EKONOMIS_B', $scope.fdBTB.PENYUSUTAN_KEUSANGAN_EKONOMIS_B);
                
                $scope.fdBTB.PENYUSUTAN_TOTAL_PENYUSUTAN = $scope.fdBTB.PENYUSUTAN_TOTAL_KEMUNDURAN_FISIK + $scope.fdBTB.PENYUSUTAN_KEUSANGAN_FUNGSIONAL_B + $scope.fdBTB.PENYUSUTAN_KEUSANGAN_EKONOMIS_B;
                
                console.log('PENYUSUTAN_TOTAL_PENYUSUTAN', $scope.fdBTB.PENYUSUTAN_TOTAL_PENYUSUTAN);
                
                $scope.fdBTB.PENYUSUTAN_TOTAL_PENYUSUTAN = $scope.fdBTB.PENYUSUTAN_TOTAL_PENYUSUTAN > 100 ? 100 : $scope.fdBTB.PENYUSUTAN_TOTAL_PENYUSUTAN;
                
                console.log('PENYUSUTAN_TOTAL_PENYUSUTAN', $scope.fdBTB.PENYUSUTAN_TOTAL_PENYUSUTAN);
                
                $scope.fdBTB.LOCK_PENYUSUTAN = 1;
                $state.go('btb.nilaipasarbangunan');
                
                return true;
                
            };
            
            $scope.editPenyusutan = function(){
                $scope.fdBTB.LOCK_PENYUSUTAN = 0;
                $scope.fdBTB.LOCK_NILAI_PASAR_BANGUNAN = 0;
            };
            
            $scope.calculateNilaiPasarBangunan = function(){
                
                
                
                // Biaya Reproduksi (Rp/m2)	: Total harga Banguan per m² + Biaya Langsung + Biaya Tidak Langsung
                // Biaya Reproduksi Total (Rp)	: Luas Bangunan × Biaya Reproduksi (Rp/m2)
                // Penyusutan   (Rp)		: Total Penyusutan × Biaya Reproduksi Total
                // Nilai Pasar Bangunan (Rp)	: Biaya Reproduksi Total - Penyusutan(Final)

                $scope.fdBTB.NILAI_PASAR_BANGUNAN_BIAYA_REPRODUKSI = 
                        ($scope.fdBTB.TOTAL_HARGA_BANGUNAN_PER_METER_PERSEGI +
                        $scope.fdBTB.TOTAL_BIAYA_LANGSUNG +
                        $scope.fdBTB.TOTAL_BIAYA_TIDAK_LANGSUNG) * 1000;
                
                $scope.fdBTB.NILAI_PASAR_BANGUNAN_BIAYA_REPRODUKSI_TOTAL =
                        $scope.fdBTB.DB_LUAS_BANGUNAN * $scope.fdBTB.NILAI_PASAR_BANGUNAN_BIAYA_REPRODUKSI;
                
                $scope.fdBTB.NILAI_PASAR_BANGUNAN_PENYUSUTAN =
                        $scope.fdBTB.PENYUSUTAN_TOTAL_PENYUSUTAN * $scope.fdBTB.NILAI_PASAR_BANGUNAN_BIAYA_REPRODUKSI_TOTAL / 100;
                
                $scope.fdBTB.NILAI_PASAR_BANGUNAN_FINAL =
                        $scope.fdBTB.NILAI_PASAR_BANGUNAN_BIAYA_REPRODUKSI_TOTAL - $scope.fdBTB.NILAI_PASAR_BANGUNAN_PENYUSUTAN;
                
                $scope.fdBTB.LOCK_NILAI_PASAR_BANGUNAN = 1;
                
                return true;
                
                
            };
            
            $scope.editNilaiPasarBangunan = function(){
                $scope.fdBTB.LOCK_NILAI_PASAR_BANGUNAN = 0;
            };
            
            $scope.SET_TO_STRING = function(A){
                for (var x in $scope.fdBTB[A]){
                    if (typeof $scope.fdBTB[A][x] !== 'function') {
                        $scope.fdBTB[A][x].VOL = $scope.fdBTB[A][x].VOL.toString();
                        $scope.fdBTB[A][x].HARGA = $scope.fdBTB[A][x].HARGA.toString();
                        if ($scope.fdBTB[A][x].SCORING != undefined)
                            $scope.fdBTB[A][x].SCORING = $scope.fdBTB[A][x].SCORING.toString();
                        else
                            $scope.fdBTB[A][x].SCORING = 0;
                        $scope.fdBTB[A][x].NILAI_LANTAI = $scope.fdBTB[A][x].NILAI_LANTAI.toString();
                    }
                }
            };
            
            $scope.saveAll = function(){
                
                console.log("fdBTB",$scope.fdBTB);
                
//                if ($scope.calculateKonstruksi()){
//                    if ($scope.calculateKomponenBangunan()) {
//                        if ($scope.calculateNilaiBangunanPerMeter()){
//                            if ($scope.calculateBiayaLangsung()){
//                                if ($scope.calculateBiayaTidakLangsung()){
//                                    if ($scope.calculatePenyusutan()){
//                                        if ($scope.calculateNilaiPasarBangunan()){

                                            $scope.SET_TO_STRING('KONSTRUKSI');
                                            $scope.SET_TO_STRING('BASEMENT');
                                            $scope.SET_TO_STRING('RANGKA_ATAP');
                                            $scope.SET_TO_STRING('PENUTUP_ATAP');
                                            $scope.SET_TO_STRING('DINDING_MATERIAL_UTAMA');
                                            $scope.SET_TO_STRING('DINDING_MATERIAL_PENDUKUNG');
                                            $scope.SET_TO_STRING('PINTU_JENDELA');
                                            $scope.SET_TO_STRING('LANGIT_LANGIT');
                                            $scope.SET_TO_STRING('LANTAI');
                                            $scope.SET_TO_STRING('SANITASI');
                                            $scope.SET_TO_STRING('INSTALASI_LISTRIK');

                                            $scope.fdBTB.KONSTRUKSI_HARGA_TOTAL = $scope.fdBTB.KONSTRUKSI_HARGA_TOTAL.toString();
                                            $scope.fdBTB.BASEMENT_HARGA_TOTAL = $scope.fdBTB.BASEMENT_HARGA_TOTAL.toString();
                                            $scope.fdBTB.RANGKA_ATAP_HARGA_TOTAL = $scope.fdBTB.RANGKA_ATAP_HARGA_TOTAL.toString();
                                            $scope.fdBTB.PENUTUP_ATAP_HARGA_TOTAL = $scope.fdBTB.PENUTUP_ATAP_HARGA_TOTAL.toString();
                                            $scope.fdBTB.DINDING_MATERIAL_UTAMA_HARGA_TOTAL = $scope.fdBTB.DINDING_MATERIAL_UTAMA_HARGA_TOTAL.toString();
                                            $scope.fdBTB.DINDING_MATERIAL_PENDUKUNG_HARGA_TOTAL = $scope.fdBTB.DINDING_MATERIAL_PENDUKUNG_HARGA_TOTAL.toString();
                                            $scope.fdBTB.PINTU_JENDELA_HARGA_TOTAL = $scope.fdBTB.PINTU_JENDELA_HARGA_TOTAL.toString();
                                            $scope.fdBTB.LANGIT_LANGIT_HARGA_TOTAL = $scope.fdBTB.LANGIT_LANGIT_HARGA_TOTAL.toString();
                                            $scope.fdBTB.LANTAI_HARGA_TOTAL = $scope.fdBTB.LANTAI_HARGA_TOTAL.toString();
                                            $scope.fdBTB.SANITASI_HARGA_TOTAL = $scope.fdBTB.SANITASI_HARGA_TOTAL.toString();
                                            $scope.fdBTB.INSTALASI_LISTRIK_HARGA_TOTAL = $scope.fdBTB.INSTALASI_LISTRIK_HARGA_TOTAL.toString();
                                            
                                            $scope.fdBTB.PENUTUP_ATAP_SCORING_TOTAL = $scope.fdBTB.PENUTUP_ATAP_SCORING_TOTAL.toString();
                                            $scope.fdBTB.PINTU_JENDELA_SCORING_TOTAL = $scope.fdBTB.PINTU_JENDELA_SCORING_TOTAL.toString();
                                            $scope.fdBTB.LANGIT_LANGIT_SCORING_TOTAL = $scope.fdBTB.LANGIT_LANGIT_SCORING_TOTAL.toString();
                                            $scope.fdBTB.LANTAI_SCORING_TOTAL = $scope.fdBTB.LANTAI_SCORING_TOTAL.toString();
                                            
                                            $scope.fdBTB.TOTAL_HARGA_BANGUNAN_PER_METER_PERSEGI = $scope.fdBTB.TOTAL_HARGA_BANGUNAN_PER_METER_PERSEGI.toString();
                                            
                                      
                                            $scope.fdBTB.BIAYA_LANGSUNG.OVERHEAD.VOL = $scope.fdBTB.BIAYA_LANGSUNG.OVERHEAD.VOL.toString();
                                            $scope.fdBTB.BIAYA_LANGSUNG.OVERHEAD.NILAI = $scope.fdBTB.BIAYA_LANGSUNG.OVERHEAD.NILAI.toString();
                                            
                                            $scope.fdBTB.BIAYA_LANGSUNG.FEE_KONSULTAN.VOL = $scope.fdBTB.BIAYA_LANGSUNG.FEE_KONSULTAN.VOL.toString();
                                            $scope.fdBTB.BIAYA_LANGSUNG.FEE_KONSULTAN.NILAI = $scope.fdBTB.BIAYA_LANGSUNG.FEE_KONSULTAN.NILAI.toString();
                                            
                                            $scope.fdBTB.BIAYA_LANGSUNG.BIAYA_KONSULTAN.VOL = $scope.fdBTB.BIAYA_LANGSUNG.BIAYA_KONSULTAN.VOL.toString();
                                            $scope.fdBTB.BIAYA_LANGSUNG.BIAYA_KONSULTAN.NILAI = $scope.fdBTB.BIAYA_LANGSUNG.BIAYA_KONSULTAN.NILAI.toString();
                                            
                                            $scope.fdBTB.TOTAL_BIAYA_LANGSUNG = $scope.fdBTB.TOTAL_BIAYA_LANGSUNG.toString();
                                            
                                            $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.PPN.VOL = $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.PPN.VOL.toString();
                                            $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.PPN.NILAI = $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.PPN.NILAI.toString();
                                            
                                            $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.BIAYA_KONSULTASI.VOL = $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.BIAYA_KONSULTASI.VOL.toString();
                                            $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.BIAYA_KONSULTASI.NILAI = $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.BIAYA_KONSULTASI.NILAI.toString();
                                            
                                            $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.IDC.VOL = $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.IDC.VOL.toString();
                                            $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.IDC.NILAI = $scope.fdBTB.BIAYA_TIDAK_LANGSUNG.IDC.NILAI.toString();
                                            
                                            $scope.fdBTB.TOTAL_BIAYA_TIDAK_LANGSUNG = $scope.fdBTB.TOTAL_BIAYA_TIDAK_LANGSUNG.toString();
                                            
                                            $scope.fdBTB.NILAI_EKONOMIS_UMUR_EKONOMIS_BANGUNAN = $scope.fdBTB.NILAI_EKONOMIS_UMUR_EKONOMIS_BANGUNAN.toString();
                                            
                                            $scope.fdBTB.NILAI_EKONOMIS_UMUR_EFEKTIF_BANGUNAN = $scope.fdBTB.NILAI_EKONOMIS_UMUR_EFEKTIF_BANGUNAN.toString();
                                            
                                            $scope.fdBTB.PENYUSUTAN_KEMUNDURAN_FISIK = $scope.fdBTB.PENYUSUTAN_KEMUNDURAN_FISIK.toString();
                                            
                                            $scope.fdBTB.PENYUSUTAN_KONDISI_TERLIHAT_A = $scope.fdBTB.PENYUSUTAN_KONDISI_TERLIHAT_A.toString();
                                            
                                            $scope.fdBTB.PENYUSUTAN_KONDISI_TERLIHAT_B = $scope.fdBTB.PENYUSUTAN_KONDISI_TERLIHAT_B.toString();
                                            
                                            $scope.fdBTB.PENYUSUTAN_TOTAL_KEMUNDURAN_FISIK = $scope.fdBTB.PENYUSUTAN_TOTAL_KEMUNDURAN_FISIK.toString();
                                            
                                            $scope.fdBTB.PENYUSUTAN_KEUSANGAN_FUNGSIONAL_A = $scope.fdBTB.PENYUSUTAN_KEUSANGAN_FUNGSIONAL_A.toString();
                                            
                                            $scope.fdBTB.PENYUSUTAN_KEUSANGAN_FUNGSIONAL_B = $scope.fdBTB.PENYUSUTAN_KEUSANGAN_FUNGSIONAL_B.toString();
                                            
                                            $scope.fdBTB.PENYUSUTAN_KEUSANGAN_EKONOMIS_A = $scope.fdBTB.PENYUSUTAN_KEUSANGAN_EKONOMIS_A.toString();
                                            
                                            $scope.fdBTB.PENYUSUTAN_KEUSANGAN_EKONOMIS_B = $scope.fdBTB.PENYUSUTAN_KEUSANGAN_EKONOMIS_B.toString();
                                            
                                            $scope.fdBTB.TOTAL_PENYUSUTAN = $scope.fdBTB.PENYUSUTAN_TOTAL_PENYUSUTAN.toString();
                                            
                                            $scope.fdBTB.NILAI_PASAR_BANGUNAN_BIAYA_REPRODUKSI = $scope.fdBTB.NILAI_PASAR_BANGUNAN_BIAYA_REPRODUKSI.toString();
                                            
                                            $scope.fdBTB.NILAI_PASAR_BANGUNAN_BIAYA_REPRODUKSI_TOTAL = $scope.fdBTB.NILAI_PASAR_BANGUNAN_BIAYA_REPRODUKSI_TOTAL.toString();
                                            
                                            $scope.fdBTB.PENYUSUTAN_TOTAL_PENYUSUTAN = $scope.fdBTB.PENYUSUTAN_TOTAL_PENYUSUTAN.toString();
                                            
                                            $scope.fdBTB.NILAI_PASAR_BANGUNAN_PENYUSUTAN = $scope.fdBTB.NILAI_PASAR_BANGUNAN_PENYUSUTAN.toString();
                                            
                                            $scope.fdBTB.NILAI_PASAR_BANGUNAN_FINAL = $scope.fdBTB.NILAI_PASAR_BANGUNAN_FINAL.toString();
                                            
                                            
                                            
                                            
                                            
                                            $http({
                                                method  : 'POST',
                                                url     : apiBase + 'btb/post_all',
                                                headers : { 'Content-Type':'application/x-www-form-urlencoded' },
                                                data    : $scope.fdBTB
                                            }).then(function(R) {

                                                if (R.data.status == true){
                                                    globalFunction.ag('success',['Success']);
                                                    $scope.fdBTB = {};
                                                    $state.go('btb.saved');
                                                    console.log($rootScope);																																																			
                                                } else {
                                                    globalFunction.ag('danger',['Failed']);
                                                }

                                                console.log(R);

                                            }, function myError(R){ 
                                                console.log(R);
                                                globalFunction.ag('danger','Error');
                                            });
                                            
//                                        }
//                                    }
//                                }
//                            }
//                        }
//                    }
//                }                                
            };
            
            $scope.getAllById = function(d){
                
                console.log('get data btb by id '+d['id']);
                
                $http({
                    method  : "GET",
                    url     : apiBase+'btb/get_allById/?id='+d['id'],
                    dataType: 'json',
                    headers : { 'Content-Type':'application/json' },
                }).then(function mySuccess(R) {
                    
                    
                    
                    $scope.fdBTB = R.data;
                    
                    $scope.dtTP = new Date(R.data.TANGGAL_PENILAIAN);
                    
                    console.log('BTB DATA BY ID',$scope.fdBTB);
                    
                    $scope.fdBTB.LOCK_INFORMASI = 0;
                    $scope.fdBTB.LOCK_KONSTRUKSI = 0;
                    $scope.fdBTB.LOCK_KOMPONEN_BANGUNAN = 0;
                    $scope.fdBTB.LOCK_NILAI_BANGUNAN_PERMETER = 0;
                    $scope.fdBTB.LOCK_BIAYA_LANGSUNG = 0;
                    $scope.fdBTB.LOCK_BIAYA_TIDAK_LANGSUNG = 0;
                    $scope.fdBTB.LOCK_PENYUSUTAN = 0;
                    $scope.fdBTB.LOCK_NILAI_PASAR_BANGUNAN = 0;
                    
                    
                    
                    $scope.formKonstruksi = globalFunction.buildForm($scope.fdBTB.KONSTRUKSI);
                    $scope.formBasement = globalFunction.buildForm($scope.fdBTB.BASEMENT);
                    $scope.formRangkaAtap = globalFunction.buildForm($scope.fdBTB.RANGKA_ATAP);
                    $scope.formPenutupAtap = globalFunction.buildForm($scope.fdBTB.PENUTUP_ATAP);
                    $scope.formDindingMaterialUtama = globalFunction.buildForm($scope.fdBTB.DINDING_MATERIAL_UTAMA);
                    $scope.formDindingMaterialPendukung = globalFunction.buildForm($scope.fdBTB.DINDING_MATERIAL_PENDUKUNG);
                    $scope.formPintuJendela = globalFunction.buildForm($scope.fdBTB.PINTU_JENDELA);
                    $scope.formLangitLangit = globalFunction.buildForm($scope.fdBTB.LANGIT_LANGIT);
                    $scope.formLantai = globalFunction.buildForm($scope.fdBTB.LANTAI);
                    $scope.formSanitasi = globalFunction.buildForm($scope.fdBTB.SANITASI);
                    $scope.formInstalasiListrik = globalFunction.buildForm($scope.fdBTB.INSTALASI_LISTRIK);
                    
                    console.log('RANGKA_ATAP',globalFunction.buildForm($scope.fdBTB.LANGIT_LANGIT));
                    
                    

                }, function myError(R) { 
                    console.log(R.statusText);  
                    globalFunction.ag('danger',[R]); 
                    if (d['gl']) globalFunction.closeModalLoading();
                });
                
            };
            
            if ($stateParams.info_id != 'N')
                $scope.getAllById({id : $stateParams.info_id});
            
            $scope.$watchGroup(['fdBTB.TAHUN_DIBANGUN'],function(nv){
                if (nv){
                    $scope.fdBTB.NILAI_EKONOMIS_UMUR_EFEKTIF_BANGUNAN = $scope.fdBTB.TAHUN_PENILAIAN - $scope.fdBTB.TAHUN_DIBANGUN;
                }
            });
            
            $scope.formValid = function(){
            
                $scope.formValidMsg = [];
                
                if ($state.current.name == 'btb.informasi')
                {
                    if (!$scope.fdBTB.TANGGAL_PENILAIAN) {
                        $scope.formValidMsg.push('Tanggal penilaian tidak boleh kosong');
                    }
                    if (!$scope.fdBTB.TAHUN_PENILAIAN) {
                        $scope.formValidMsg.push('Tahun penilaian tidak boleh kosong');
                    }
                    if (!$scope.fdBTB.INDEX_KEMAHALAN) {
                        $scope.formValidMsg.push('Index kemahalan tidak boleh kosong');
                    }
                    if (!$scope.fdBTB.JENIS_BANGUNAN_ID) {
                        $scope.formValidMsg.push('Jenis bangunan tidak boleh kosong');
                    }
                    if (!$scope.fdBTB.TIPE_BANGUNAN_ID) {
                        $scope.formValidMsg.push('Tipe bangunan tidak boleh kosong');
                    }
                    if (!$scope.fdBTB.DB_LUAS_BANGUNAN) {
                        $scope.formValidMsg.push('Luas bangunan tidak boleh kosong');
                    }
                    if (!$scope.fdBTB.JUMLAH_LANTAI_BANGUNAN) {
                        $scope.formValidMsg.push('Jumlah lantai bangunan tidak boleh kosong');
                    }
                    if (!$scope.fdBTB.JUMLAH_LANTAI_BASEMENT) {
                        $scope.formValidMsg.push('Jumlah lantai basement tidak boleh kosong');
                    }
                    if (!$scope.fdBTB.TAHUN_DIBANGUN) {
                        $scope.formValidMsg.push('Tahun dibangun tidak boleh kosong');
                    }
                }

                if ($scope.formValidMsg.length > 0) {
                    globalFunction.ag('danger',$scope.formValidMsg);
                    return false;
                } else {
                    return true;
                }

            };
            
             
        })
        .controller('btbInformasiCtrl', function($scope){
            
            if ($scope.fdBTB.TANGGAL_PENILAIAN)
                $scope.dtTP = new Date($scope.fdBTB.TANGGAL_PENILAIAN);
        
        })
        .controller('btbKonstruksiCtrl', function($scope){
        
            
        
        })
        .controller('btbKomponenBangunanCtrl', function($scope){
        
            
        
        })
        .controller('btbBiayaLainlainCtrl', function($scope){
        
            
        
        })
        .controller('btbPenyusutanCtrl', function($scope){
        
            
        
        })
        .controller('btbNilaiPasarBangunanCtrl', function($scope){
        
            
        
        });
        
    
})();