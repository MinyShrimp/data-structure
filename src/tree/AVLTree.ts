import Memory from "../memory/Memory";
import TreeNode from "../node/TreeNode";

/**
 * AVL Tree
 * 
 */
export default class AVLTree {
    private memory: Memory = new Memory();
    private root: string | null = null;

    constructor() {}

    /**
     * 새로운 노드 생성
     */
    private __createNewNode = (data: number): string => {
        const newNode: TreeNode<number> = {
            data: data,
            height: 1,
            left: null,
            right: null,
        };
        const newHash: string = this.memory.insert(newNode);
        return newHash;
    };

    /**
     * 후위 순회를 하면서 height값을 다시 정하는 함수
     * @param {string | null} hash 
     */
    private __postOrder = ( hash : string ) => {
        const node = this.memory.getReperence( hash ) as TreeNode<number> ;

        if( node.left !== null ) {
            this.__postOrder( node.left );
        }

        if( node.right !== null ) {
            this.__postOrder( node.right );
        }

        const node_left_height  = node.left  === null ? 0 : this.memory.getReperence( node.left ).height;
        const node_right_height = node.right === null ? 0 : this.memory.getReperence( node.right ).height;
        node.height = 1 + Math.max( node_left_height, node_right_height );
    }

    /**
     * 왼쪽(반시계) 회전
     * @param {string} hash
     * @returns node.right
     * 
     * @description
     * 1. node.right.left = node;
     * 2. node.right = node.right.left;
     * 
     * * A -R> B -L> C
     * * B -L> A -R> C
     */      
    private __leftRotation = ( hash: string ): string => {
        // A => B => C

        // A
        const node = this.memory.getReperence(hash) as TreeNode<number>;

        // B
        const node_right_hash = node.right as string;
        const node_right_node = this.memory.getReperence( node_right_hash ) as TreeNode<number>;

        // C
        const node_right_left_hash = node_right_node.left;

        // B => A
        node_right_node.left = hash;

        // A => C
        node.right = node_right_left_hash;

        // return B
        return node_right_hash;
    }

    /**
     * 오른쪽(시계) 회전
     * @param {string} hash
     * @returns node.left
     * 
     * @설명
     * 1. node.left.right = node;
     * 2. node.left = node.left.right;
     * 
     * * A -L> B -R> C
     * * B -R> A -L> C
     */
    private __rightRotation = ( hash: string ): string => {
        // A
        const node = this.memory.getReperence(hash) as TreeNode<number>;

        // B
        const node_left_hash = node.left as string;
        const node_left_node = this.memory.getReperence( node_left_hash ) as TreeNode<number>;

        // C
        const node_left_right_hash = node_left_node.right;

        // B => A
        node_left_node.right = hash;

        // A => C
        node.left = node_left_right_hash;

        return node_left_hash;
    }

    /**
     * Get Balance Factor
     * @param {string | null} hash
     * @returns node.left.height - node.right.height;
     */
    private __getBalanceFactor = ( hash: string | null ) : number => {
        if( hash === null ) { return 0; }

        const root = this.memory.getReperence(hash) as TreeNode<number>;
        const left_height  = root.left  === null ? 0 : this.memory.getReperence(root.left).height;
        const right_heigth = root.right === null ? 0 : this.memory.getReperence(root.right).height;

        return left_height - right_heigth;
    }

    /**
     * 밸런스 재 설정
     * @param {string} hash 
     * @returns hash
     */
    private __rebalance = ( hash: string ): string => {
        const bFactor = this.__getBalanceFactor( hash );
        if( Math.abs(bFactor) < 2 ) { return hash; }

        const root = this.memory.getReperence( hash ) as TreeNode<number>;
        if( root.left !== null ) {
            const leftFactor = this.__getBalanceFactor( root.left );

            if( bFactor > 1 && leftFactor <= 0 ) {
                root.left = this.__leftRotation( root.left );
                return this.__rightRotation( hash );
            }
            if( bFactor > 1 && leftFactor > 0 ) {
                return this.__rightRotation( hash );
            }
        }
        if( root.right !== null ) {
            const rightFactor = this.__getBalanceFactor( root.right );

            if( bFactor < -1 && rightFactor <= 0 ) {
                return this.__leftRotation( hash );
            }
            if( bFactor < -1 && rightFactor > 0 ) {
                root.right = this.__rightRotation( root.right );
                return this.__leftRotation( hash );
            }
        }

        return hash;
    }

    /**
     * 
     * @param {string | null} hash 
     * @param {number} data 
     * @returns 
     */
    private __insert = (hash: string | null, data: number): string => {
        if (hash === null) {
            return this.__createNewNode(data);
        }

        const root = this.memory.getReperence(hash) as TreeNode<number>;
        if (data > root.data) {
            root.right = this.__insert(root.right, data);
        } else if (data < root.data) {
            root.left = this.__insert(root.left, data);
        } else {
            return hash;
        }

        const new_root_hash = this.__rebalance( hash );
        this.__postOrder( new_root_hash );
        return new_root_hash;
    };

    public insert = (...datas: Array<number>): void => {
        datas.forEach(v => {
            this.root = this.__insert(this.root, v);
        });
    };

    /**
     * 노드 삭제
     *
     * 1. 목표 노드가 리프 노드인 경우,
     *  - 목표 노드 삭제
     * 
     * 2. 목표 노드에 자식이 1개 있는 경우,
     *  - 목표 노드 삭제
     *  - 자식 노드를 부모 노드에 연결
     * 
     * 3. 목표 노드에 자식이 2개 있는 경우,
     *  - 목표 노드 탐색
     *  - 목표 노드의 successor 노드 탐색
     *  - 목표 노드와 successor 노드 위치 교환
     *  - 목표 노드 삭제
     */
     private minValueNode = ( nodeHash: string ): string | null => {
        let curNode: TreeNode<string> = this.memory.getReperence( nodeHash );
        let curHash: string | null = nodeHash;

        while( curHash !== null && curNode.left !== null ) {
            curHash = curNode.left;
            curNode = this.memory.getReperence( curNode.left );

            console.log(curNode, curHash)
        }

        return curHash;
    }

    private __delete = ( rootHash: string | null, key: number ): string | null => {
        // Base Case
        if (rootHash === null) {
            return null;
        }

        // 삭제할 노드를 찾는다
        const root = this.memory.getReperence(rootHash);
        if (key > root.data) {
            root.right = this.__delete(root.right, key);
        } else if (key < root.data) {
            root.left = this.__delete(root.left, key);
        } else {
            // 찾은 경우,
            console.log(rootHash, root)

            // 노드에 자식이 하나이거나 없는 경우
            if( root.left === null ) {
                const rightHash = root.right;
                this.memory.remove( rootHash );
                if( rootHash === this.root ) {
                    this.root = rightHash;
                }
                return rightHash;
            } else if( root.right === null ) {
                const leftHash = root.left;
                this.memory.remove( rootHash );
                if( rootHash === this.root ) {
                    this.root = leftHash;
                }
                return leftHash;
            }

            // 노드에 자식이 둘 있는 경우
            const successorHash = this.minValueNode( root.right );
            const successorNode = this.memory.getReperence( successorHash as string );
            root.data = successorNode.data;
            root.right = this.__delete( root.right, successorNode.data );
        }

        return rootHash;
    } 

    public delete = (key: number): string | null => {
        return this.__delete( this.root, key );
    }

    /**
     * @returns 메모리 반환
     */
    public getMemory = (): Readonly<Map<string, any>> => {
        return this.memory.getMemory();
    };
}