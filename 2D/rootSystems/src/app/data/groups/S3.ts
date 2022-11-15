export enum S3Element{
    e = "e",
    d = "d",
    d2 = "d2",
    s1 = "s1",
    s2 = "s2",
    s3 = "s3"
}


export default class S3{
    static multiply(
        a: S3Element,
        b: S3Element,
    ){
        return this.multiplicationTable[b][a];
    }
    static multiplicationTable = {
        "e": {
            "e": S3Element.e,
            "d": S3Element.d,
            "d2": S3Element.d2,
            "s1": S3Element.s1,
            "s2": S3Element.s2,
            "s3": S3Element.s3
        },
        "d": {
            "e": S3Element.d,
            "d": S3Element.d2,
            "d2": S3Element.e,
            "s1": S3Element.s2,
            "s2": S3Element.s3,
            "s3": S3Element.s1
        },
        "d2": {
            "e": S3Element.d2,
            "d": S3Element.e,
            "d2": S3Element.d,
            "s1": S3Element.s3,
            "s2": S3Element.s1,
            "s3": S3Element.s2
        },
        "s1": {
            "e": S3Element.s1,
            "d": S3Element.s3,
            "d2": S3Element.s2,
            "s1": S3Element.e,
            "s2": S3Element.d2,
            "s3": S3Element.d
        },
        "s2": {
            "e": S3Element.s2,
            "d": S3Element.s1,
            "d2": S3Element.s3,
            "s1": S3Element.d,
            "s2": S3Element.e,
            "s3": S3Element.d2
        },
        "s3": {
            "e": S3Element.s3,
            "d": S3Element.s2,
            "d2": S3Element.s1,
            "s1": S3Element.d2,
            "s2": S3Element.d,
            "s3": S3Element.e
        }
    }
}