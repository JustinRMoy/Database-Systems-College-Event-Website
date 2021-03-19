

<?php

 function sendEmail($email, $confirmCode){
      
    $name = "Taoufik Laaroussi";
    $body = '<h1>Welcome to pricereview.ch </h1><br><br><h3>Here is your activation code: ' .$confirmCode;
    $subject = "Confirmation email";
    
    $headers = array(
        'Authorization: Bearer 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',
        'Content-Type: application/json'
        );
        
    $data = array(
        "personalizations" => array(
              array(
                  "to" => array(
                        array(
                              "email" => $email,
                              "name" => $name
                              )
                        )
                  )
              ),
              "from" => array(
                    "email" => "Support@pricereview.cf"
                    ),
                    
              "subject" => $subject,
              "content" => array(
                    array(
                        "type" => "text/html",
                        "value" => $body
                        )
                    )
              );
              
              $ch = curl_init();
              curl_setopt($ch, CURLOPT_URL, "https://api.sendgrid.com/v3/mail/send");
              curl_setopt($ch, CURLOPT_POST, 1);
              curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
              curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
              curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
              curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
              
              $response = curl_exec($ch);
              curl_close($ch);
              //echo $response;
}

