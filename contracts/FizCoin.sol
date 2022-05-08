// SPDX-License-Identifier: MIT
// contracts/FizCoin.sol

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "BigNumber.sol";
import "RSA.sol";

contract FizCoin is ERC20 {
    // Error Codes:
    // 001 - Insufficient balance of FIZ token. Min 100 FIZ for freezing.
    // 002 - Account is not creator.
    // 003 - Deadline is less than 1 day (86400 sec) or less now time.
    // 004 - Incorrect index of problem.
    // 005 - Creator can't create solution of problem.
    // 006 - The request to send the solution was made later than the deadline of the problem.
    // 007 - You created a solution copying its from problem or other solver's solution.
    // 008 - Incorrect index of problem.
    // 009 - The answer was sent before the deadline.
    // 010 - Only creator of problem can add answer.
    // 011 - The time limit for sending (decrypting) the answer has been exceeded.
    // 012 - The answer to the problem can be sent only once.
    // 013 - A reward has already been claimed for this problem.
    // 014 - Creator can't claim reward of his problem.
    // 015 - Some problems do not have answers added. Expect answers to the rest of the problems.
    // 016 - Insufficient balance of FIZ token. Min 1 FIZ for freezing.

    /**
     * @param index Index of Problem in FizCoin
     * @param uri_problem A URI of file with problem in IPFS network
     * @param deadline A timestamp of deadline
     * @param c An encoded answer
     * @param n A part of public key
     * @param e A part of public key
     */
    struct Problem {
        address creator;
        uint128 index;
        bytes uri_problem;
        uint256 deadline;
        bytes c;
        bytes n;
        bytes e;
    }

    /**
     * @param index Index of Problem in FizCoin
     * @param encoded_ans Encoded answer with pub key of Problem
     * @param timestamp A timestamp of Solution
     * @param verified Verified
     */
    struct Solution {
        uint128 index;
        bytes c;
        uint256 timestamp;
        bool verified;
        bool valid;
        bool skipped;
    }

    /**
     * @param index Index of Problem in FizCoin
     * @param d Secret exponent for decoding answer and solutions
     */
    struct Answer {
        uint128 index;
        bytes d;
        uint8 check_mark;
    }

    uint128 indexProblem = 0; // Index of next problem
    Problem[] public problems;
    address public mainAllower;
    mapping (address => Solution []) public solutions;
    mapping (uint128 => Answer) public answers;
    mapping (address => bool) public creators;
    mapping (address => bool []) public claimedRewards;
    mapping (uint128 => address []) public solvers;
    mapping (uint128 => uint256) public fund;

    constructor(uint256 supply) ERC20("FizCoin", "FIZ") {
        mainAllower = msg.sender;
        creators[msg.sender] = true;
        _mint(msg.sender, supply * (10 ** decimals()));
    }

    function allowCreator(address addr, bool allow) public returns (bool) {
        require(mainAllower == msg.sender);
        creators[addr] = allow;
        return true;
    }

    function divider(uint numerator, uint denominator, uint precision) private pure returns(uint) {
        return (numerator*(uint(10)**uint(precision+1))/denominator + 5)/uint(10);
    }

    function createProblem(bytes memory uri_problem, uint256 deadline, bytes memory c, bytes memory n, bytes memory e) public returns (bool) {
        require(balanceOf(msg.sender) >= 10 * (10 ** decimals()), "001");
        require(creators[msg.sender] == true, "002");
        require(deadline >= block.timestamp + 86400, "003");

        transferFrom(msg.sender, address(this), 100 * (10 ** decimals()));

        problems.push(Problem({
            creator: msg.sender,
            index: indexProblem,
            uri_problem: uri_problem,
            deadline: deadline,
            c: c,
            n: n,
            e: e
        }));

        solvers[indexProblem].push(msg.sender);

        indexProblem += 1;

        return true;
    }

    function showProblems() public view returns (Problem [] memory) {
        return problems;
    }

    function getSolutions(address addr) public view returns (Solution [] memory) {
        return solutions[addr];
    }

    function checkSolutionCopy(uint128 index, bytes memory c) public view returns (bool) {
        if ( BigNumber.cmp(BigNumber._new(c, false, false), BigNumber._new(problems[index].c, false, false), false) == 0 ) {
            return false;
        }

        for (uint256 i = 0; i < solvers[index].length; i++) {
            for (uint256 j = 0; j < solutions[solvers[index][i]].length; j++) {
                if (solvers[index][i] != msg.sender && BigNumber.cmp(BigNumber._new(c, false, false), BigNumber._new(solutions[solvers[index][i]][j].c, false, false), false) == 0) {
                    return false;
                }
            }
        }

        return true;
    }

    function createSolution(uint128 index, bytes memory c) public returns (bool) {
        require(balanceOf(msg.sender) >= 1 * (10 ** decimals()), "016");
        require(index < indexProblem, "004");
        require(problems[index].creator != msg.sender, "005");
        require(problems[index].deadline >= block.timestamp, "006");

        require(checkSolutionCopy(index, c) == true, "007");

        for (uint128 i = 0; i < solutions[msg.sender].length; i++) {
            if (solutions[msg.sender][i].index == index) {
                solutions[msg.sender][i] = Solution({
                    index: index,
                    c: c,
                    timestamp: block.timestamp,
                    verified: false,
                    valid: false,
                    skipped: false
                });

                return true;
            }
        }

        transferFrom(msg.sender, address(this), 1 * (10 ** decimals()));

        solutions[msg.sender].push(Solution({
            index: index,
            c: c,
            timestamp: block.timestamp,
            verified: false,
            valid: false,
            skipped: false
        }));

        solvers[index].push(msg.sender);

        return true;
    }

    function createAnswer(uint128 index, bytes memory d) public returns (bool) {
        require(index < indexProblem, "008");
        require(problems[index].deadline < block.timestamp, "009");
        require(msg.sender == problems[index].creator, "010");

        if (answers[index].check_mark == 0) {
            require(problems[index].deadline + 172800 > block.timestamp, "011");
            answers[index] = Answer({
                index: index,
                d: d,
                check_mark: 1
            });
            return true;
        } else {
            require(false, "012");
            return false;
        }
    }

    /**
     * @dev This function claims rewards from right solutions and fines of problems missed by creator.
     */
    function claimRewardAndFines(uint128 index) public returns (bool) {
        require(index < indexProblem, "004");
        require(false == claimedRewards[msg.sender][index], "013");
        require(msg.sender != problems[index].creator, "014");

        uint256 claimed = 0;

        uint wr = 0;
        uint rg = 0;

        // Checking all problems for adding responses (taking into account sending a response with a deadline)
        for (uint128 i = 0; i < solutions[msg.sender].length; i++) {
            // Index of the problem
            uint128 problem_index = solutions[msg.sender][i].index;

            if (answers[problem_index].check_mark == 0 && problems[problem_index].deadline + 172800 > block.timestamp) {
                require(false, "015");
                return false;
            }

            // Calculation of compensation from the late addition of an answer to the problem of the creator of this problem.
            if (answers[problem_index].check_mark == 0 && problems[problem_index].deadline + 172800 <= block.timestamp && claimedRewards[msg.sender][problem_index] == false) {
                claimed += divider(100 * (10 ** decimals()), solvers[problem_index].length, 0) - 1;
                solutions[msg.sender][i].skipped = true;
                claimedRewards[msg.sender][problem_index] = true;
            }

            // Checking each solution to obtain an estimate of the probability of collecting a reward.
            if (answers[problem_index].check_mark == 1 && claimedRewards[msg.sender][problem_index] == false) {
                // The `verified` tag has been added so that the complex isValidSolution() method is not performed on the following checks                if (!solutions[msg.sender][problem_index].verified) {
                if (!solutions[msg.sender][problem_index].verified) {
                    solutions[msg.sender][problem_index].valid = RSA.isValidSolution(
                        solutions[msg.sender][problem_index].c,
                        problems[problem_index].n,
                        problems[problem_index].c,
                        answers[solutions[msg.sender][problem_index].index].d
                    );

                    solutions[msg.sender][problem_index].verified = true;
                }

                if (solutions[msg.sender][problem_index].valid) rg += 1;
                else wr += 1;
            }
        }

        uint chance = 0;
        if ( !((wr == 0 && rg == 0) || (wr == 0 && rg == 1)) ) {
            // Convertation from (%) to promillis: 60% -> 60.000% -> 60000
            chance = divider(rg, (rg + wr), 5);
        }

        claimedRewards[msg.sender][index] = true;

        // Receiving a refund
        if (claimed != 0) {
            transferFrom(address(this), msg.sender, claimed);
        }

        // Receiving rewards
        if (chance != 0) _mint(msg.sender, chance * (10 ** (decimals() - 5)));
        else return false;

        return true;
    }
}