// [content, timer] = body.split("&");
// content = decodeURIComponent(content.replace("content=", "").replace(/\+/g, " "));
// timer = timer.replace("timer=", "") * 1;
// const location = save_content(content, timer);

// console.log(content);

// database[token] = {"content": content, "time": timer};

// response.writeHead(302, {'Location': "/f/" + token});
// response.end("Success!");

const fs = require("fs");

function database(rootdir) {
	
	const filesystem = {
		check: function(token) {
			try {
				const file = fs.readFileSync(rootdir + token, 'utf8');
				[date, expiry] = file.split("---");
				
				const now = Math.floor(Date.now() / 1000);

				if ((date + expiry) < now) {
					fs.unlinkSync(rootdir + token);
					return false;
				}

				return true
			}

			catch(err) {
				return false;
			}
		},

		save: function(content, expiry) {
			const token = Math.random().toString(36).substr(2, 12);
			const now = Math.floor(Date.now() / 1000);

			const body = expiry + "\n---\n" + now + "\n---\n" + content;

			try {
				fs.writeFileSync(rootdir + token, body, 'utf8', {flags: 'wx+'});
				return token;
			}

			catch (err) {
				console.log(err);
				return undefined;
			}
		},

		load: function() {

		}
	}
	
	return filesystem;
}

module.exports = database;