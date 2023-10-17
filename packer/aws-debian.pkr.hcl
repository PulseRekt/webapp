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

variable "ami_name" {
  type = string
  default = "my-ami_${formatdate("YYYY_MM_DD_hh_mm_ss",timestamp())}"
}



variable "aws_instance" {
  type    = string
  default = "ami-06db4d78cb1d3bbf9"
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
      "unzip web-app.zip -d web-app",
      "ls -a",
      "cd web-app",
      "npm install",
      "npm install nodemon"
    ]
  }
}

source "amazon-ebs" "my-ami" {
  profile       = var.profile
  ami_name      = var.ami_name
  instance_type = var.instance_type
  region        = var.region
  source_ami    = var.source_ami
  ssh_username  = var.ssh_username
  // security_group_id = "sg-0997c39dda94141f9"
  ami_users = var.ami_users

  // access_key = "${var.acceskey}"
  // secret_key = "${var.secretkey}"

  aws_polling {
    delay_seconds = 60
    max_attempts  = 60
  }
}
