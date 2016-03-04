# comics-app

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

sudo docker build -t comics_image .

sudo docker run -d -p 3000:80 -e SECRET_KEY_BASE=secretkey -e VIRTUAL_HOST="beta.comics" --name="beta" comics_image

