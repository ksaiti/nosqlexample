// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("analytics");

// Average time spent per page.
db.getCollection("clickstream").aggregate({
    "$group":{
        "_id": "$page",
        "avg_time": {"$avg": "$time_spent"}
    }
});

// Average time spent per country.
db.getCollection("clickstream").aggregate({
    "$group":{
        "_id": "$country",
        "avg_time": {"$avg": "$time_spent"}
    }
});

// Total time by device
db.getCollection("clickstream").aggregate({
    "$group":{
        "_id": "$device",
        "sum_time": {"$sum": "$time_spent"}
    }
});

// Total time by device and by country
db.getCollection("clickstream").aggregate([
{$group:{
    _id:{device:"$device",
        country: "$country"
    },
        sum_time: {$sum: "$time_spent"}
    }
}
]);

// Min time spent by device and user
db.getCollection("clickstream").aggregate([
{$group:{
    _id:{device:"$device",
        _id: "$user_id"
    },
        min_time: {$min: "$time_spent"}
    }
}
]);

// Show only user
db.getCollection("clickstream").find(
{},
{
    user_id: 1,
    _id: 0
}   
);

// Show only user and page
db.getCollection("clickstream").find(
{},
{
    user_id: 1,
    page: 1,
    _id: 0
}   
);

// Show only device and country
db.getCollection("clickstream").find(
{},
{
    device: 1,
    country: 1,
    _id: 0
}   
);

// Show only device, country, page
db.getCollection("clickstream").find(
{},
{
    device: 1,
    country: 1,
    page: 1,
    _id: 0
}   
);

// Show only device, country, page, time_spent == all except the user
db.getCollection("clickstream").find(
{},
{
    user_id: 0,
    _id: 0
}   
);

// Show only device, country, page, time_spent == all except the user
db.getCollection("clickstream").find(
{},
{
    device: 1,
    country: 1,
    page: 1,
    time_spent: 1,
    _id: 0
}   
);

// sort by time_spent (max -> min)  -1 DESCending
db.getCollection("clickstream").find().sort({
    time_spent: -1
})

//  Show only device, country, page, time_spent and sort by time_spent (DESCending)
db.getCollection("clickstream").find({},
{
    device: 1,
    country: 1,
    page: 1,
    time_spent: 1,
    _id: 0
}   ).sort({
    time_spent: -1
})

// Show only device, country, page, time_spent and sort by time_spent (ASCending)
db.getCollection("clickstream").find({},
{
    device: 1,
    country: 1,
    page: 1,
    time_spent: 1,
    _id: 0
}   ).sort({
    time_spent: 1
})

// Show top3 highest engagement sessions == 3 top time_spent
db.getCollection("clickstream")
.find().sort({time_spent: -1}).limit(3);

// Show the page with the lowest engagement session
db.getCollection("clickstream")
.find({},
{
    page: 1,
    time_spent: 1,
    _id: 0
}   ).sort({time_spent: 1}).limit(1);

// Show the lowest engagement session per page 

db.getCollection("clickstream").aggregate([
{
    $group: {
        _id: "$page",
        lowest_time: { $min:"$time_spent"}
    }
}
]);


// analytics pipeline example
// filter mobile users, group by page, calculate metrics and sort results

db.getCollection("clickstream").aggregate([
    {
        $match: {device: "mobile"}
    },
    {
    $group: {
        _id:"$page",
        avg_time: {$avg: "$time_spent"}
    }
    },
    {
    $sort: {avg_time: -1}
    }
]);


