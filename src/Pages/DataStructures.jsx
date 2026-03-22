import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DataStructureCard from '../components/ui/DataStructureCard'

const DataStructures = () => {
  return (
    <div className="w-full bg-surface text-on-surface overflow-x-hidden font-sans min-h-screen flex flex-col">
      <Navbar />
      
      <section className='bg-surface py-24 px-6 sm:px-16 flex-grow' id="DataStructure">
        <div className='w-full max-w-7xl mx-auto'>
          <div className="mb-4">
            <span className="label-sm text-primary tracking-[0.1em] border-b border-outline-variant pb-1 uppercase">Components</span>
          </div>
          <div className='headline-md text-on-surface mb-6'>
            Choose Your Structure
          </div>
          <div className='body-md text-on-surface opacity-80 max-w-2xl'>
            Select any architecture below to commence visualization and connect with the specialized assistant.
          </div>
        </div>
        
        <div className="mt-16 flex flex-col gap-16 max-w-7xl mx-auto">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DataStructureCard
              icon="bi bi-arrow-right"
              title="Singly Linked List"
              complexity="O(1) Insert / O(n) Search"
              description="Sequential nodes forming a linear unyielding chain."
              dataStructure="Singly Linked List"
            />
            <DataStructureCard
              icon="bi bi-arrows"
              title="Doubly Linked List"
              complexity="O(1) Insert / O(n) Search"
              description="Bi-directional sequential traversal mechanics."
              dataStructure="Doubly Linked List"
            />
            <DataStructureCard
              icon="bi bi-stack"
              title="Stack"
              complexity="O(1) Push/Pop"
              description="Strict Last-In-First-Out (LIFO) hierarchy."
              dataStructure="Stack"
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DataStructureCard
              icon="bi bi-collection"
              title="Queue"
              complexity="O(1) Enqueue/Dequeue"
              description="First-In-First-Out (FIFO) pipeline mechanism."
              dataStructure="Queue"
            />
            <DataStructureCard
              icon="bi bi-diagram-3"
              title="Binary Tree"
              complexity="O(n) Traversal"
              description="Hierarchical architectural branching."
              dataStructure="Binary Tree"
            />
            <DataStructureCard
              icon="bi bi-tree"
              title="Binary Search Tree"
              complexity="O(log n) Avg"
              description="Ordered hierarchy enabling logarithmic access times."
              dataStructure="Binary Search Tree"
            />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DataStructureCard
              icon="bi bi-arrow-up-circle"
              title="Max Heap"
              complexity="O(log n) Mutation"
              description="Strictly dominant parent hierarchy."
              dataStructure="Max Heap"
            />
            <DataStructureCard
              icon="bi bi-arrow-down-circle"
              title="Min Heap"
              complexity="O(log n) Mutation"
              description="Strictly submissive parent hierarchy."
              dataStructure="Min Heap"
            />
            <DataStructureCard
              icon="bi bi-bezier"
              title="AVL Tree"
              complexity="O(log n) Guaranteed"
              description="Self-balancing binary structure enforcing perfect equilibrium."
              dataStructure="AVL Tree"
            />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default DataStructures;
