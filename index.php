<html>
<body text="#0000AA" bgcolor="#ddf0ef">
<head><title>Garg</title> </head>
<table border=0 width=1400>
<tbody><tr>
<td> <img src="files/Shaleen.jpg" alt="[photograph]" height="170" align="left"> 	</td>
<td>	<table border="0">
		<tbody><tr><td></td><td><big><em>Shaleen Garg</em></big>
                </td></tr><tr><td></td><td><em><small>Ph.D. Candidate</small></em>
		</td></tr><tr><td></td><td><em><a href="https://www.cs.rutgers.edu/">Department of Computer Science</a></em>
                </td></tr><tr> <td></td><td> <a href="https://www.rutgers.edu/" target="_top"><em>
Rutgers University</em></a>
                	</td></tr></tbody></table>
</td>
</tr></tbody></table>
<hr>
<tr><td align=left width=1%><td> <a href="files/Shaleengarg.pdf">Resume</a> <a href="research.html">Research</a> <a href="writings.html">Writings</a> <a href="others.html">NonTechnical</a>
                      <br> 
                      <hr>

                      <ul>
                    <b>About Me</b> <ul>

                    <br>I am a PhD student at <a href="https://www.cs.rutgers.edu/"> Rutgers University</a> 
<br> <br>

                    My research interests are Operating systems, High-Performance computing and distributed systems.<br><br>

                    I am working with <a href="https://www.cs.rutgers.edu/~sk2113/">Dr. Sudarsun Kannan</a> and <a href="http://manishparashar.org">Dr. Manish Parashar</a> on making the OS suitable for HPC applications<br><br>
            </a></ul>
                            </ul>
                            <!--
                            <a href="https://stallman.org/facebook.html"><img src="files/no-facebook.png" alt="no_facebook" style="width:304px; height:128px" ></a>
-->
                                <hr size=4 noshade align=left>   
                                This page was last updated on 8th March 2020. Thank you for visiting :)
                                <br><br>
<?php
$ip = $_SERVER['REMOTE_ADDR'];
$time = $_SERVER['REQUEST_TIME'];
$browser = $_SERVER['HTTP_USER_AGENT'];
$referrer = $_SERVER['HTTP_REFERER'];
if ($referred == "") {
    $referrer = "direct";
}

/*
 *
 $filename = 'info.txt';
if (is_writable($filename)) {
    echo 'The file is writable';
} else {
    echo 'The file is not writable';
}
 */

$myfile = fopen("./info.txt", "a") or die("Unable to open file!");
fwrite($myfile, "{'ip':$ip, 'browser':$browser, 'time':$time}\n");
fclose($myfile);
</body>
    </html>
