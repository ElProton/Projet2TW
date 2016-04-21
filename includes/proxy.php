<?php
    $configContext = array(
            'http' => array(
                    'proxy' => 'tcp://cache.univ-lille1.fr:3128',
                    'request_fulluri' => true
            )
    );
    stream_context_set_default($configContext);
?>
