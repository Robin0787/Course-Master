## Welcome to Course Masters Server

### Live link of this application server : https://course-masters-api.vercel.app/

### Here are the steps to run the application in your local environment.

1 . Clone the repository [```git clone {repository-url}```]

2 . Run the command to install all the dependencies `npm install`

3 . Create a `.env` file and write these three value

```
NODE_ENV=development
PORT=7000                   // Write your port
DB_URL=                     // Write your database url
```

4 . Now, write this command to build the application for running. Write the command `tsc` to build.

5 . Then run this command `npm run start:prod` to start the server.

#### Now go the this address of your browser `http://localhost://7000` to see the output.

## API ENDPOINTS:

### Course related APIs

1 . Post - `http://localhost:7000/api/course` = to create a new course. Include course information to the request body as like the below data.

```
{
    "title": "Sample Course",
    "instructor": "Jane Doe",
    "categoryId": "123456789012345678901234",
    "price": 49.99,
    "tags": [
        {
            "name": "Programming",
            "isDeleted": false
        },
        {
            "name": "Web Development",
            "isDeleted": false
        }
    ],
    "startDate": "2023-01-15",
    "endDate":"2023-03-14",
    "language": "English",
    "provider": "Tech Academy",
    "details": {
        "level": "Intermediate",
        "description": "Detailed description of the course"
    }
}
```

2 . Get - `http://localhost:7000/api/courses ` = To get all the courses from the database.
This API can filter data with queries in params as like below.

```
When interacting with the API, you can utilize the following query parameters to customize and filter the results according to your preferences.

1. page: (Optional) Specifies the page number for paginated results. Default is 1. Example: ?page=2

2. limit: (Optional) Sets the number of items per page. Default is a predefined limit. Example: ?limit=10

3. sortBy: (Optional) Specifies the field by which the results should be sorted. Only applicable to the following fields: title, price, startDate, endDate, language, durationInWeeks. Example: ?sortBy=startDate

4. sortOrder: (Optional) Determines the sorting order, either 'asc' (ascending) or 'desc' (descending). Example: ?sortOrder=desc

5. minPrice, maxPrice: (Optional) Filters results by a price range. Example: ?minPrice=20.00&maxPrice=50.00

6. tags: (Optional) Filters results by the name of a specific tag. Example: ?tags=Programming

7. startDate, endDate: (Optional) Filters results by a date range. Example: ?startDate=2023-01-01&endDate=2023-12-31

8. language: (Optional) Filters results by the language of the course. Example: ?language=English

9. provider: (Optional) Filters results by the course provider. Example: ?provider=Tech Academy

10. durationInWeeks: (Optional) Filters results by the duration of the course in weeks. Example: ?durationInWeeks=8

11. level: (Optional) Filters results by the difficulty level of the course. Example: ?level=Intermediate
```

### Category related APIs

1. Post - `http://localhost:7000/api/categories` = To create a new category. Include category information to the request body as like the below data.

```
{
    "name": "Programming"
}
```

2. Get - `http://localhost:7000/api/categories` = To get all the categories from datbase.

### Review related APIs

1. Post - `http://localhost:7000/api/reviews` = To create a new review. Include review information to the request body as like the below data.

```
{
    "courseId": "123456789012345678901234",
    "rating": 4,
    "review": "Great course!"
}
```

2. Get - `http://localhost:7000/api/reviews` = To get all the categories from datbase.

### Update a Course API

1. PUT - `http://localhost:7000/api/courses/:courseId` = To Update a course send the data with the request body you want to update like below:

```
{
    "price": 39.99,
    "details": {
        "level": "Intermediate"
    }
}
```

### Get Course With reviews

1. Get `https://localhost:7000/api/courses/:courseId/reviews` = Replace courseId with the id to get the course with reviews.

### Get the best course based on average reviews

1. Get `https://localhost:7000/api/course/best` = To get the best course based on average reviews.
