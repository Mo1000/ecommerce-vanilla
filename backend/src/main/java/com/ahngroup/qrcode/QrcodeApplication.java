package com.ahngroup.qrcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@SpringBootApplication
@EnableMongoRepositories
public class QrcodeApplication {

	public static void main(String[] args) {
		SpringApplication.run(QrcodeApplication.class, args);
	}


}
