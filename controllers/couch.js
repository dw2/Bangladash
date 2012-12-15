module.exports = function (db) {
    return {
        updateCharacter: function (req, res) {
            var _key = 'member-' + req.params.memberId;
            db.save(_key, req.body, function (err, rsp) {
                if (!err) {
                    res.send({ success: true });
                } else {
                    res.send(500);
                }
            });
        }
    }
};