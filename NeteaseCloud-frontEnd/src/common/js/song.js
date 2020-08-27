export default class Song{
	constructor({id,mid,singer,name,album,image}){
		this.id = id
		this.mid = mid
		this.singer = singer
		this.name = name
		this.album = album
		this.image = image
	}
}

export function settingSong(musicData){
	return new Song({
		id: musicData.songid,
		mid: musicData.songmid,
		singer: musicData.singer[0].name,
		name: musicData.songname,
		album: musicData.albumname,
		image: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${musicData.albummid}.jpg?max_age=2592000`
	})
}
