# xAPI Statements

[![NPM Package Version](https://badge.fury.io/js/xapi-statements.svg)](https://www.npmjs.com/package/xapi-statements)
[![Build Status](https://travis-ci.org/LearningLocker/xapi-statements.svg?branch=master)](https://travis-ci.org/LearningLocker/xapi-statements)
[![Renovate badge](https://img.shields.io/badge/Renovate-enabled-brightgreen.svg)](https://renovateapp.com/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Join the chat at https://gitter.im/LearningLocker/learninglocker](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/LearningLocker/learninglocker?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

*Learning Locker is a trademark of [HT2 Inc.](http://ht2labs.com)*

### Installation
To install all of Learning Locker, see the [installation documentation](http://docs.learninglocker.net/guides-installing/). To install just the xAPI statements service, you can follow the instructions below.

1. Clone the repository `git clone git@github.com:LearningLocker/xapi-statements.git`.
1. Install dependencies `npm install`.
1. Build the code `npm run build`.
1. Start the server `npm start`.

### Development
1. Follow [the installation procedure](#installation).
1. Make your changes to the "src" directory.
1. Build the code `npm run build`.
1. Test the code `npm run test-all`.
1. Run the server `npm start`.

### Docker
You can use the steps below to install and run the xAPI statements service.

- Create a ".env" file using the ".env.example" file in this Github repository.
- Pull the image from DockerHub `docker pull learninglocker/xapi-statements:master`.
- Run the image in a container `docker run -d -p 8080:80 --env-file .env learninglocker/xapi-statements:master`.
