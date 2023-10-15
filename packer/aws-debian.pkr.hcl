packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = ">= 1.0.0"
    }
  }
}

source "amazon-ebs" "my-ami" {
  profile           = "dev"
  ami_name          = "my-ami"
  instance_type     = "t2.micro"
  region            = "us-east-1"
  source_ami        = "ami-06db4d78cb1d3bbf9"
  ssh_username      ="admin"
  security_group_id = "sg-0997c39dda94141f9"

  aws_polling {
    delay_seconds = 60
    max_attempts  = 60
  }
}

build {
  name = "packer"
  sources = [
    "source.amazon-ebs.my-ami"
  ]
}

