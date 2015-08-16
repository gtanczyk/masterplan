var VM = {};
 
VM.sqr = function(v) {
    return v * v;
};
 
VM.direction = function(v1, v2) {
    return Math.atan2(v2.y - v1.y, v2.x - v1.x);
};

VM.distance = function(v1, v2) {
    return Math.sqrt(VM.sqr(v1.x - v2.x) + VM.sqr(v1.y - v2.y));  
};