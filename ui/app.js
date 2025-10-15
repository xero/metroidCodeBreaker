var x;
(x = () => {
	/* metroid password generator / decoder
	 * reverse engineering by unknown - algorithm by SnowBro */
	class decoder {
		constructor(name) {
			/* get element */
			this.gel = (id)=>{
				return document.getElementById(name + id);
			};
			/* get index */
			this.id = (id)=>{
				return this.gel(id).selectedIndex;
			};
			/* set index */
			this.ids = (id, v)=>{
				this.gel(id).selectedIndex = v;
			};
			/* get checked */
			this.ch = (id)=>{
				return this.gel(id).checked ? 1 : 0;
			};
			/* set checked */
			this.chs = (id, v)=>{
				this.gel(id).checked = v > 0;
			};
			/* get text */
			this.tx = (id)=>{
				return this.gel(id).value;
			};
			/* set text */
			this.txs = (id, v)=>{
				this.gel(id).value = v;
			};
			/* main logic */
			this.rotate = (roll)=>{
				let result = [
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				];
				result[16] = this.bytes[16]; /* encryption */
				result[17] = this.bytes[17]; /* checksum */
				/* handle bit by bit */
				for (let n = 0; n < 128; ++n) {
					let m = (n + roll) & 127;
					let bit = 1 & (this.bytes[m >> 3] >> (7 - (m & 7)));
					result[n >> 3] |= bit << (7 - (n & 7));
				}
				this.bytes = result;
			};
			this.convert_bits = (input, ib, ob)=>{
				let cache = 0;
				let cachelen = 0;
				let result = [];
				let nm = input.length;
				let obm = (1 << ob) - 1;
				for (let n = 0; n < nm; ++n) {
					/* populate low bits */
					cache = (cache << ib) + input[n];
					for (cachelen += ib; cachelen >= ob;) {
						cachelen -= ob;
						/* eat high bits */
						result.push((cache >> cachelen) & obm);
						/* keep low bits */
						cache &= (1 << cachelen) - 1;
					}
				}
				return result;
			};
			/* render */
		this.updatedots = ()=>{
				let t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz?- ";
				let s = "";
				for (let n = 0; n < 24; ++n) s += t.charAt(this.chars[n]);
				this.txs("code1", s.slice(0, 6) + " " + s.slice(6, 12));
				this.txs("code2", s.slice(12, 18) + " " + s.slice(18, 24));
			};
			/* convert code to options */
			this.decode = ()=>{
				let error = 0;
				let message = "";
				let t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz?- ";
				let code1 = this.tx("code1") + "0000000000000";
				let code2 = this.tx("code2") + "0000000000000";
				for (let n = 0; n < 6; ++n) {
					let c = t.indexOf(code1.charAt(n));
					c = c == 64 ? 255 : c & 63;
					this.chars[n + 0] = c;
					c = t.indexOf(code1.charAt(n + 7));
					c = c == 64 ? 255 : c & 63;
					this.chars[n + 6] = c;
					c = t.indexOf(code2.charAt(n));
					c = c == 64 ? 255 : c & 63;
					this.chars[n + 12] = c;
					c = t.indexOf(code2.charAt(n + 7));
					c = c == 64 ? 255 : c & 63;
					this.chars[n + 18] = c;
				}
				/* convert 6-bit to 8-bit */
				this.bytes = this.convert_bits(this.chars, 6, 8);
				this.roll = this.bytes[16];
				let sum = this.bytes[17];
				this.rotate(this.roll);
				let sum2 = 0;
				for (let n = 0; n < 17; ++n) sum2 += this.bytes[n];
				sum2 &= 255;
				for (let n = 0; n < 128; ++n) {
					let b = n >> 3;
					if (!(b == 10 || (n >= 64 && n <= 67)))
						this.chs("b" + n, this.bytes[b] & (1 << (n & 7)));
				}
				this.ids("misl", this.bytes[10]);
				this.ids("begin", this.bytes[8] & 15);
				this.ids("crypto", this.bytes[16]);
				this.ids("sum", this.bytes[17]);
				if (sum != sum2) {
					error = 1;
					message += "ERROR! checksum " + sum + " should be " + sum2;
					this.txs("msg", message);
				}
			};
			/* generate code from form */
			this.gener8 = ()=>{
				/* clear the password */
				for (let n = 0; n < 16; ++n) {
					this.bytes[n] = 0;
				}
				/* add each input bit to it */
				for (let n = 0; n < 128; ++n) {
					let b = n >> 3;
					/* ignore bits which are given as numbers (such as missile counts) */
					if (!(b == 10 || (n >= 64 && n <= 67)))
						this.bytes[b] |= this.ch("b" + n) << (n & 7);
				}
				/* store the input numbers (this.id() fetches the selected index of a selectbox) */
				this.bytes[8] |= this.id("begin");
				this.bytes[10] = this.id("misl");
				this.bytes[16] = this.roll & 255;
				/* calculate checksum */
				let sum = 0;
				for (let n = 0; n < 17; ++n) sum += this.bytes[n];
				this.bytes[17] = sum & 255;
				this.rotate(-this.roll); /* this is correct */
				/* convert 8-bit to 6-bit */
				this.chars = this.convert_bits(this.bytes, 8, 6);
				this.updatedots();
				this.decode();
			};
			/* code change handler */
			this.modified = ()=>{
				this.txs("msg", "");
				this.decode();
				/* reencode the password. fixes the checksum */
				this.gener8();
			};
			/* debug code  */
			this.narpassword = ()=>{
				document.getElementById("mcb").reset();
				let opts = [
					"troidb2",
					"troidb3",
					"troidb4",
					"troidb6",
					"troidb9",
					"troidb10",
					"troidb13",
					"troidb15",
					"troidb16",
					"troidb19",
					"troidb20",
					"troidb22",
					"troidb23",
					"troidb24",
					"troidb27",
					"troidb29",
					"troidb32",
					"troidb33",
					"troidb34",
					"troidb38",
					"troidb39",
					"troidb45",
					"troidb48",
					"troidb53",
					"troidb54",
					"troidb56",
					"troidb57",
					"troidb60",
					"troidb61",
					"troidb63",
					"troidb70",
				];
				for (let o in opts) {
					document.getElementById(opts[o]).checked = true;
				}
				document.getElementById("note").style = "display: block";
			};
			/* init logic */
			this.gel("code1").onchange = _=>{
				troid.modified();
			};
			this.gel("code2").onchange = _=>{
				troid.modified();
			};
			document.querySelector("#mcb").onclick = _=>{
				troid.gener8();
			};
			document.getElementById("metroid").onclick = _=>{
				troid.narpassword();
			};
			/* 0..255 values */
			this.bytes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			/* 0..63 encoded values */
			this.chars = [
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0,
			];
			/* 0..255 */
			this.roll = 0;
		}
	}
	troid = new decoder("troid");
	setTimeout("troid.gener8()", 30);
}),
	"loading" !== document.readyState
		? x()
		: document.addEventListener("DOMContentLoaded", x);
