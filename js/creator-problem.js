let bits = 512;

function egcd(a, b) {
    let x = new BN(0, 10);
    let y = new BN(1, 10);
    let u = new BN(1, 10);
    let v = new BN(0, 10);
    let gcd;
    while (a.eq(new BN(0, 10)) === false) {
        let q = b.div(a);
        let r = b.mod(a);
        let m = x.sub( u.mul(q) );
        let n = y.sub( v.mul(q) );

        b = a;
        a = r;
        x = u;
        y = v;
        u = m;
        v = n;
        gcd = b;
    }
    return x;
}

async function main() {

    let generatePrime_1 = new Promise((resolve, reject) => {
        forge.prime.generateProbablePrime(bits, function(err, num) {
            resolve(num.toString(16));
        })
    });
    let p_ = await generatePrime_1;

    let generatePrime_2 = new Promise((resolve, reject) => {
        forge.prime.generateProbablePrime(bits, function(err, num) {
            resolve(num.toString(16));
        })
    });
    let q_ = await generatePrime_2;

    console.log("p: " + p_)
    console.log("q: " + q_)

    let p = new BN(p_, 16);
    let q = new BN(q_, 16);

    let n = p.mul(q);
    console.log("n: " + n.toString(16));

    let phi = ( p.sub(new BN(1, 10)) ).mul( q.sub(new BN(1, 10)) );
    console.log("phi(n): " + phi.toString(16))

    let e = new BN(65537, 10); // not 65537 !

    let d = egcd(e, phi)

    console.log("d: " + d.toString(16));

    // 12...35 03 aabbccdd11223344 (in hex format)
    //         ^^ — digits in a float part of answer

    let hex_m = "1234503aabbccdd11223344"; // -> 23.785 answer

    let m = new BN(hex_m, 16);
    console.log("m: " + m.toString(16));

    setTimeout(function () {
        let c = m.pow(e).mod(n);
        console.log("c: " + c.toString(16));
    }, 5000);
    // let c = m.pow(e).mod(n);
    // console.log("c: " + c.toString(16));

}

main()



String.prototype.hexEncode = function(){
    let hex, i;

    let result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}

String.prototype.hexDecode = function(){
    let j;
    let hexes = this.match(/.{1,4}/g) || [];
    let back = "";

    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}


const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

let message = genRanHex(12) + "2348".hexEncode()
