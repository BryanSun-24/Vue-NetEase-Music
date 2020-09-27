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
		id: musicData.id,
		singer: musicData.ar[0].name,
		name: musicData.name,
		album: musicData.name,
		image: musicData.al.picUrl
	})
}

export function searchSettingSong(result){
	return new Song({
		id: result.id,
		singer: result.artists[0].name,
		name: result.name,
		album: result.album.name,
		image: result.artists.img1v1Url
	})
}
