<?php
    require("hashUtil.php");
    echo crypt($_GET['txt'], aleatSalt()); 
?>
