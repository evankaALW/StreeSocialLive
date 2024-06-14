const https = require('https');

exports.sendOtp = (req, res) => {
    const { mobileNumber } = req.body;
    if (!mobileNumber) {
        return res.status(400).json({ error: "Mobile number is required." });
    }

    const options = {
        method: "POST",
        hostname: "control.msg91.com",
        path: `/api/v5/otp?template_id=6669404cd6fc0565025c2102&mobile=${mobileNumber}&authkey=408994AbeVcmRYV66682d3bP1`,
        headers: {
            "Content-Type": "application/JSON",
        }
    };

    const request = https.request(options, function (response) {
        const chunks = [];

        response.on("data", function (chunk) {
            chunks.push(chunk);
        });

        response.on("end", function () {
            const body = Buffer.concat(chunks);
            if (response.statusCode === 200) {
                console.log("OTP sent successfully");
                res.status(200).json({ message: "OTP sent successfully" });
            } else {
                console.error("Failed to send OTP");
                res.status(response.statusCode).json({ error: "Failed to send OTP" });
            }
        });
    });

    request.on("error", function (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    });

    request.end();
};

exports.verifyOtp = (req, res) => {
    const { otp, mobileNumber } = req.body;
    if (!otp || !mobileNumber) {
        return res.status(400).json({ error: "OTP and mobile number are required." });
    }

    const options = {
        method: "GET",
        hostname: "control.msg91.com",
        path: `/api/v5/otp/verify?otp=${otp}&mobile=${mobileNumber}`,
        headers: {
            "authkey": "408994AbeVcmRYV66682d3bP1"
        }
    };

    const request = https.request(options, function (response) {
        const chunks = [];

        response.on("data", function (chunk) {
            chunks.push(chunk);
        });

        response.on("end", function () {
            const body = Buffer.concat(chunks);
            console.log(body.toString()); // This would be the response from the OTP verification service
            res.status(response.statusCode).send(body); // Send the response from the OTP verification service back to the client
        });
    });

    request.on("error", function (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    });

    request.end();
};
