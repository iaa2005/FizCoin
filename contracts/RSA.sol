// SPDX-License-Identifier: MIT
// contracts/RSA.sol

pragma solidity ^0.8.0;

import "BigNumber.sol";

library RSA {
    /**
     * @param c Encrypted answer in solution
     * @param d A part of secret key to check answers after deadline
     * @param n A part of public and secret key
     * @return m A decoded message from encoded message c
     */
    function RSADecode(bytes memory c, bytes memory d, bytes memory n) public view returns (bytes memory) {
        BigNumber.instance memory bigC = BigNumber._new(c, false, false);
        BigNumber.instance memory bigD = BigNumber._new(d, false, false);
        BigNumber.instance memory bigN = BigNumber._new(n, false, false);

        return BigNumber.prepare_modexp(bigC, bigD, bigN).val;
    }

    function isValidSolution(bytes memory sol_c, bytes memory n, bytes memory prob_c, bytes memory d) public view returns (bool) {
        bytes memory sol = RSADecode(sol_c, d, n);
        bytes memory ans = RSADecode(prob_c, d, n);

        bytes32 dataSol = bytes32(sol) >> 64;
        bytes32 dataAns = bytes32(ans) >> 64;

        uint lenFloatSol = uint( (dataSol << 248) >> 248 );
        uint lenFloatAns = uint( (dataAns << 248) >> 248 );

        uint intSol = uint( dataSol >> 8 );
        uint intAns = uint( dataAns >> 8 );

        return intSol * (10 ** (lenFloatSol + lenFloatAns)) == intAns * (10 ** (lenFloatSol + lenFloatAns));
    }

}