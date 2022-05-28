
import Memory from "../memory/Memory";
import TreeNode from "../node/TreeNode";

/**
 * 트리 구조
 */
export default class BinarySearchTree {
    private root:   string = "";
    private memory: Memory = new Memory();

    constructor() {
        this.root = this.memory.insert( { data: "ROOT", left: null, right: null } );

        const BHash = this.memory.insert( { data: "B", left: null, right: null } );
        this.addNode( this.root, BHash );

        const CHash = this.memory.insert( { data: "C", left: null, right: null } );
        this.addNode( this.root, CHash );

        const DHash = this.memory.insert( { data: "D", left: null, right: null } );
        this.addNode( BHash, DHash );

        const EHash = this.memory.insert( { data: "E", left: null, right: null } );
        this.addNode( BHash, EHash );

        const FHash = this.memory.insert( { data: "F", left: null, right: null } );
        this.addNode( CHash, FHash );

        const GHash = this.memory.insert( { data: "G", left: null, right: null } );
        this.addNode( CHash, GHash );

        console.log(this.memory.getMemory());
        console.log('----------------------------------------');
        this.preOrder( this.memory.getReperence(this.root) );
        console.log('----------------------------------------');
        this.inOrder( this.memory.getReperence(this.root) );
        console.log('----------------------------------------');
        this.postOrder( this.memory.getReperence(this.root) );
    }

    /**
     * 새로운 노드 추가
     */
    addNode = ( rootHash: string, nodeHash: string ) => {
        const rootNode = this.memory.getReperence( rootHash );

        if( rootNode.left === null ) {
            rootNode.left = nodeHash;
        } else if( rootNode.right === null ) {
            rootNode.right = nodeHash;
        } else {
            throw `AddNode: RootNode is Full`;
        }
    }

    /**
     * 전위 순회
     * 트리를 복사하거나, 전위 표기법을 구하는데 사용
     * 트리를 복사할때 전위 순회를 사용하는 이유는, 
     * 생성할 때 자식 노드보다 부모 노드가 먼저 생성되어야 하기 때문이다.
     * 
     * ROOT => B => D => E => C => F => G
     */
    preOrder = ( root: TreeNode<string> | null ) => {
        if( root === null ) { return ; }

        console.log( root.data );

        if( root.left !== null ) {
            this.preOrder( this.memory.getReperence( root.left  ));
        }

        if( root.right !== null ) {
            this.preOrder( this.memory.getReperence( root.right ));
        }
    }

    /**
     * 중위 순회
     * 이진 탐색트리(BST)에서 오름차순 또는 내림차순으로 값을 가져올 때 사용된다.
     * 내림차순으로 값을 가져오기 위해서는 역순으로 중위 순회를 하면된다.
     * 
     * B => D => E => ROOT => C => F => G
     */
    inOrder = ( root: TreeNode<string> | null ) => {
        if( root === null ) { return ; }

        if( root.left !== null ) {
            this.preOrder( this.memory.getReperence( root.left  ));
        }

        console.log( root.data );

        if( root.right !== null ) {
            this.preOrder( this.memory.getReperence( root.right ));
        }
    }

    /**
     * 후위 순회
     * 트리를 삭제하는데 주로 사용된다.
     * 부모노드를 삭제하기 전에 자식 노드를 먼저 삭제해야하기 때문이다.
     * 
     * B => D => E => C => F => G => ROOT
     */
    postOrder = ( root: TreeNode<string> | null ) => {
        if( root === null ) { return ; }

        if( root.left !== null ) {
            this.preOrder( this.memory.getReperence( root.left  ));
        }

        if( root.right !== null ) {
            this.preOrder( this.memory.getReperence( root.right ));
        }

        console.log( root.data );
    }
}

const tree = new BinarySearchTree();