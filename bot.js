const twit = require("twit")
const config = require("./config")

const T = new twit(config)

const retweet = function() {
    let params = {
        q: "#backenddevelopment, #Nodejs, #backendjobs"
    }

    T.get("search/tweets", params, function(err, data) {
        if(!err) {
            for(let i = 0; i < 5; i++) {
                let rtId = data.statuses[i].id_str;
                T.post("statuses/retweet/:id", {
                    id: rtId
                }, function(err, res) {
                    if(res) {
                        console.log("Successfully retweeted!");
                    }
                    if(err) {
                        console.log(err);
                    }
                });
            }
        } else {
            console.log("Could not search tweets.")
        }
    })
}
retweet();
setInterval(retweet, 600000);