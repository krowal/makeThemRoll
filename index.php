<!DOCTYPE html>
<html>
	<head>
		<title>MakeMeRoll</title>
	</head>

	<body>
		<h1>Available tests:</h1>
		<?php 
			$list = scandir('test');
			foreach($list as $d){
				if(in_array($d, array('.', '..'))) continue;
				?><a href="test/<?php echo $d?>"><?php echo $d?></a><?php
			}
		?>
	</body>
</html>
