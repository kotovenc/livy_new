<?php
	header('Content-Type: text/html; charset=utf-8');
	if($_POST){
		$name = htmlspecialchars($_POST["name"]);
		$myemail = "artoum555@gmail.com";
		if($_POST["email"]){
			$email = htmlspecialchars($_POST["email"]);
			$type = htmlspecialchars($_POST["type"]);
			$msg = htmlspecialchars($_POST["text"]);
			$message_to_myemail = "Имя - $name\n 
			Почта - $email \n 
			Я хочу - $type \n 
			Комментарий - $msg \n ";
		}

		if($_POST["phone"]){
			$phone = htmlspecialchars($_POST["phone"]);
			$message_to_myemail = "Имя - $name \n
			Телефон - $phone \n";
		}


		$result = mail($myemail, $name, $message_to_myemail, $name);
		if ($result){
        	echo "Cообщение успешно отправленно. Пожалуйста, оставайтесь на связи\n";
        	echo $message_to_myemail;
    	}
    	else {
    		echo "Что-то пошло не так";
    	}
    }

    else {
    	echo "Vvedi dannie uebek";
    }
?>