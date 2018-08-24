<?php
	if($_POST){
		$name = htmlspecialchars($_POST["name"]);
		$myemail = "artoum555@gmail.com";
		if($_POST["mail"]){
			$email = htmlspecialchars($_POST["mail"]);
			$type = htmlspecialchars($_POST["type"]);
			$msg = htmlspecialchars($_POST["text"]);
			$message_to_myemail = "Дарова, епта<br>  
			Типа имя - $name<br> 
			Мыло уронил - $email<br> 
			Это хчу - $type<br> 
			А это мое мнение - msg<br> ";
		}

		if($_POST["phone"]){
			$phone = htmlspecialchars($_POST["phone"]);
			$message_to_myemail = "ЗдРаСтВуЙтЕ!!!!<br>
			ХоЧу ПоГоВоРиТь О БоГе НаШеМ<br>
			Я $name <br>
			ЗвОнИ СюДа $phone<br>";
		}


		$result = mail($myemail, $name, $message_to_myemail, $name);
		if ($result){
        	echo "Cообщение успешно отправленно. Пожалуйста, оставайтесь на связи<br>";
        	echo $message_to_myemail;
    	}
    	else {
    		echo "Ti pidor> kekeke";
    	}
    }
?>