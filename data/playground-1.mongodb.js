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





