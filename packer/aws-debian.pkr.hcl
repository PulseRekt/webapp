packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = ">= 1.0.0"
    }
  }
}

build {
  name = "packer"
  sources = [
    "source.amazon-ebs.my-ami"
  ]

  provisioner "shell" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get upgrade -y",
      "sudo apt-get install -y software-properties-common",
      "sudo apt install nodejs npm -y",
      "sudo apt install -y zip",
      "sudo apt install -y mariadb-server",
      "echo -e 'Y\nThenothing1!\nThenothing1!\nY\nY\nY\nY\n' | sudo mysql_secure_installation"
    ]
  }


  provisioner "file" {
    source      = "web-app.zip"
    destination = "~/"
  }

  provisioner "shell" {
    inline = [
      "unzip web-app.zip",
      "ls -a",
      // "npm install",
      // "npm install nodemon"
    ]
  }



}

source "amazon-ebs" "my-ami" {
  profile       = "dev"
  ami_name      = "my-ami_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  instance_type = "t2.micro"
  region        = "us-east-1"
  source_ami    = "ami-06db4d78cb1d3bbf9"
  ssh_username  = "admin"
  // security_group_id = "sg-0997c39dda94141f9"
  ami_users = ["311572683597"]

  // access_key = "${var.acceskey}"
  // secret_key = "${var.secretkey}"

  aws_polling {
    delay_seconds = 60
    max_attempts  = 60
  }
}
