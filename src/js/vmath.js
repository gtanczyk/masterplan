var VM = {};
 
VM.sqr = function(v) {
    return v * v;
};

VM.distance = function(v1, v2) {
    return Math.sqrt(VM.sqr(v1.x - v2.x) + VM.sqr(v1.y - v2.y));  
};