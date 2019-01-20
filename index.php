<?php


$page = ( isset($_GET['page'])) ? $_GET['page'] : "home";

if( $page == "home"){
    $site = "home.php";
}else{
    $site = "404.php";
}

require $site;