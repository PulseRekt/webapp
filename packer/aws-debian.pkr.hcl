packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = ">= 1.0.0"
    }
  }
}

variable "profile" {
  description = "AWS CLI profile name"
  type        = string
  default     = "dev"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "source_ami" {
  description = "Source AMI ID"
  type        = string
  default     = "ami-06db4d78cb1d3bbf9"
}

variable "ssh_username" {
  description = "SSH username for the source AMI"
  type        = string
  default     = "admin"
}

variable "ami_users" {
  description = "List of AWS account IDs that can use the resulting AMI"
  type        = list(string)
  default     = ["311572683597"]
}


variable "DB_HOST" {
  default = ""
}

variable "DB_PORT" {
  default = ""
}

variable "DB_DATABASE" {
  default = ""
}

variable "DB_USERNAME" {
  default = ""
}

variable "DB_PASSWORD" {
  default = ""
}

variable "FILE_PATH" {
  default = ""
}

variable "aws_instance" {
  type    = string
  default = "ami-06db4d78cb1d3bbf9"
}

variable "ami_filter_owners" {
  type    = list(string)
  default = ["aws-marketplace"]
}

variable "ami_filter_name" {
  type    = string
  default = "debian-12-*"
}

variable "ami_filter_architecture" {
  type    = string
  default = "x86_64"
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
      "pwd"
      # "sudo apt install -y mariadb-server",
      # "sudo mysql -u root -e \"ALTER USER 'root'@'localhost' IDENTIFIED BY 'Thenothing1\\!';\"",
      # "export DB_HOST=${var.DB_HOST}",
      # "export DB_PORT=${var.DB_PORT}",
      # "export DB_DATABASE=${var.DB_DATABASE}",
      # "export DB_USERNAME=${var.DB_USERNAME}",
      # "export DB_PASSWORD=${var.DB_PASSWORD}",
      # "export FILE_PATH=${var.FILE_PATH}",
    ]

  }


  provisioner "file" {
    source      = "web-app.zip"
    destination = "~/"
  }

  provisioner "file" {
    source      = "./systemd/web-app.service"
    destination = "/tmp/web-app.service"
  }

  provisioner "shell" {
    inline = [
      "sudo mv /tmp/web-app.service /etc/systemd/system/web-app.service",
      "sudo unzip web-app.zip -d /opt/web-app",
      "ls -a",
      "cd /opt/web-app",
      "sudo npm install",
      "sudo npm install nodemon",
      # "systemctl daemon-reload",
      "sudo systemctl enable web-app",
      "sudo systemctl start web-app",
      "sudo systemctl restart web-app",
      "sudo systemctl stop web-app",

    ]
  }
}

source "amazon-ebs" "my-ami" {
  profile       = var.profile
  ami_name      = "my-ami_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  instance_type = var.instance_type
  region        = var.region
  // source_ami    = var.source_ami
  source_ami_filter {
    owners = var.ami_filter_owners


    filters = {
      name         = var.ami_filter_name
      architecture = var.ami_filter_architecture
      state        = "available"
    }
    most_recent = true
  }
  ssh_username = var.ssh_username
  ami_users    = var.ami_users


  aws_polling {
    delay_seconds = 60
    max_attempts  = 60
  }
}
