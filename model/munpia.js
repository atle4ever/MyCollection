function MunpiaNovel(title) {
    this.title = title;
    this.items = new Array();

    this.Article = function(id, title, link) {
        this.id = id;
        this.title = title;
        this.link = link;
    }
};

exports.MunpiaNovel = MunpiaNovel;
