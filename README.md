This is my education progress project

### Run locally

```bash
# setup packages
npm install

# run main script
npm run gulp
```

### Run in container

```bash
# build container
docker build -t my-gulp-project .

# run container
docker run -it -p 3000:3000 -v $(pwd):/app my-gulp-project
```

