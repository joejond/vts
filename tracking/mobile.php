<?php
    session_start();

    if(isset($_COOKIE['marine'])){
        $dec64= base64_decode($_COOKIE['marine']);
        // echo $dec64;
        $result = json_decode($dec64);
        // // echo $hsl->{'u'}."<br>";
        // // echo $hsl->{'tz'}."<br>";
        //
        $_SESSION['id']		= $result->{'idu'};
        $_SESSION['username']	= $result->{'u'};
        // // $_SESSION['company']	= $result->id_company;
        $_SESSION['timezone']	= $result->{'tz'};
    
      }
    
    include	'../inc/cekSession.php';


?>

<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="icon" type="image/png" href="img/vessel.png">
    <!-- Material Design for Bootstrap fonts and icons -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons">

    <!-- Material Design for Bootstrap CSS -->
    <link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css" integrity="sha384-wXznGJNEXNG1NFsbm0ugrLFMQPWswR3lds2VeinahP8N0zJw9VWSopbjv2x7WCvX" crossorigin="anonymous">

    <title>Fuel Monitoring System</title>
  </head>
<!--</body></html>-->
  <body>

    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 class="my-0 mr-md-auto font-weight-normal">Pelindo Marine Services</h5>
        <button class="btn btn-info btn-sm" href="#" id="btn_logout">LogOut</button>
    </div>

    <div class="container">
        <div class="card-deck mb-3 text-center">
        
            <div class="card mb-6 box-shadow">
                <div class="card-header">
                    <h6 class="my-0 font-weight-normal">MAP VIEW</h6>
                </div>
                <div class="card-body">
                    <button type="button" class="btn btn-lg btn-block btn-outline-primary" id="btn-map">MAP VIEW</button>
                </div>
            </div>

            <div class="card mb-6 box-shadow">
                <div class="card-header">
                    <h6 class="my-0 font-weight-normal">DETAIL DATA</h6>
                </div>
                <div class="card-body">
                    <button type="button" class="btn btn-lg btn-block btn-outline-primary" id="btn-detail">DETAIL DATA</button>
                </div>
            </div>

        </div>
        
        <div class="card-deck mb-3 text-center">
            <div class="card mb-6 box-shadow">
                <div class="card-header">
                    <h6 class="my-0 font-weight-normal">DAILY REPORT</h6>
                </div>
                <div class="card-body">
                    <button type="button" class="btn btn-lg btn-block btn-outline-primary" id="btn-report">DAILY REPORT</button>
                </div>
            </div>
            <div class="card mb-6 box-shadow">
                <div class="card-header">
                    <h6 class="my-0 font-weight-normal">ADHOC REPORT</h6>
                </div>
                <div class="card-body">
                    <button type="button" class="btn btn-lg btn-block btn-outline-primary" id="btn-adhoc">ADHOC REPORT</button>
                </div>
            </div>
        </div>

        <!-- <div class="card-deck mb-3 text-center" id="cek_master"> -->
            <div class="card mb-12 box-shadow">
                <!-- <div class="card-header">
                    <h6 class="my-0 font-weight-normal">DAILY REPORT</h6>
                </div> -->
                <div class="card-body">
                    <button type="button" class="btn btn-lg btn-block btn-outline-warning" id="btn-user">MASTER USER/EMAIL</button>
                </div>
            </div>
            <!-- <div class="card mb-6 box-shadow"> -->
                <!-- <div class="card-header">
                    <h6 class="my-0 font-weight-normal">SUMMARY</h6>
                </div> -->
                <!-- <div class="card-body">
                    <button type="button" class="btn btn-lg btn-block btn-outline-warning" id="btn-email">MASTER EMAIL</button>
                </div> -->
            <!-- </div> -->
        </div>

    </div>


    <footer class="footer border-top" >
        <div class="container">
            <span class="text-muted">PT. Daun Biru Engineering &copy;</span><span class="text-muted" id="copy-year"></span>
            <script>
                document.getElementById("copy-year").innerHTML = new Date().getFullYear();
            </script>
        </div>
    </footer>
    
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyC-UUPT4sbJjlVTR19z9tt-bBvkVVdeLmI"></script>
    <script type="text/javascript" src="../js/googlemaps-v3-utility-library/markerwithlabel/src/markerwithlabel.js"></script>
    <script type="text/javascript" src="../js/googlemaps-v3-utility-library/maplabel/src/maplabel.js"></script>

    <!-- <script type="text/javascript" src="../js/lmanager.js" sync></script> -->
    <!-- <script type="text/javascript" src="tab_map.js?ver=1.0"></script>
    <script type="text/javascript" src="detail_kapal.js?ver=1.0"></script>
    <script type="text/javascript" src="data_hitung.js?ver=1.3"></script>
    <script type="text/javascript" src="marine.js?ver=1.0"></script>
    <script type="text/javascript" src="report_adhoc.js?ver=1.0"></script>
    <script type="text/javascript" src="report_sum.js?ver=1.0"></script> -->


    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/popper.js@1.12.6/dist/umd/popper.js" integrity="sha384-fA23ZRQ3G/J53mElWqVJEGJzU0sTs+SvzG8fXVWP+kJQ1lwFAOkcUOysnlKJC33U" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js" integrity="sha384-CauSuKpEqAFajSpkdjv3z9t8E7RlpJ1UP0lKM/+NdtSarroVKu069AlsRPKkFBz9" crossorigin="anonymous"></script>
    <!-- <script type="text/javascript" src="../js/lmanager.js" sync></script> -->

    <script>
        $(document).ready(function() {
            $('body').bootstrapMaterialDesign(); 

            var uu = JSON.parse(atob(getCookie("marine")));
            // console.log(uu);
            $('#btn-map').click(function(){
                // console.log('button maps di click');
                // alert("MAPS dipilih ==>" + uu.idu);//,JSON.stringify(uu));
                window.location= "https://monita.pelindo.co.id/tracking/#map_tab";

            });
            $('#btn-detail').click(function(){
                // console.log('button maps di click');
                // alert("DETAIL DATA dipilih");
                window.location= "https://monita.pelindo.co.id/tracking/#detail_tab";
            });
            $('#btn-report').click(function(){
                // console.log('button maps di click');
                // alert("REPORT dipilih");
                window.location= "https://monita.pelindo.co.id/tracking/#analisis_tab";
            });
            $('#btn-adhoc').click(function(){
                // console.log('button maps di click');
                // alert("SUMMARY dipilih");
                window.location= "https://monita.pelindo.co.id/tracking/#adhoc_rep";
            });
            $('#btn-user').click(function(){
                // console.log('button maps di click');
                fetch('http://monita.pelindo.co.id:1999/x/login', {
                    method: 'post',
                    credentials: 'include',
                    headers: {
                        // 'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(function(response) {
                    console.log(response);
                    return response.json();
                })
                .then(function(resJson){
                    if(resJson.success){
                        window.location = "http://monita.pelindo.co.id:1999"
                    }
                })
                .catch(err => {
                    console.log(err);
                });
                // alert("Testing MASTER USER");
            });
            // $('#btn-email').click(function(){
            //     // console.log('button maps di click');
            //     alert("Testing MASTER EMAIL");
            // });

            $('#btn_logout').click(function(){
                // alert("LOGOUT NOW");
                window.location= "../LogOutUser.php";
            });

            var uu = JSON.parse(atob(getCookie("marine")));
            // console.log(getCookie("marine"));
            if (uu.idu == 43){
                // $("#cek_master").attr("style", "display: none");

            }
            // else{
            //     $("#cek_master").attr("style", "display: none");

            // }

        });

        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
                }
            }
            return "";
        }
    
    
    
    </script>


    <script>

        // document.getElementById("cek_master").style.display = "none";

    </script>
<!--</body></html>-->
  </Body>
</html>