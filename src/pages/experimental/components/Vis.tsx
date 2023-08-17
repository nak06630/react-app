/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState, useEffect, useRef } from 'react'
import { Network } from 'vis-network'
import 'vis-network/styles/vis-network.css'

// https://visjs.github.io/vis-network/examples/network/events/interactionEvents.html

export default function Vis() {
  const container = useRef(null)
  const eventSpanHeading = useRef<HTMLDivElement>(null)
  const eventSpanContent = useRef<HTMLPreElement>(null)

  const [nodes] = useState([
    { id: 1, label: 'Node 1', title: 'node 1 tooltip text' },
    { id: 2, label: 'Node 2', title: 'node 2 tooltip text' },
    { id: 3, label: 'Node 3', title: 'node 3 tooltip text' },
    { id: 4, label: 'Node 4', title: 'node 4 tooltip text' },
    { id: 5, label: 'Node 5', title: 'node 5 tooltip text' }
  ])

  const [edges] = useState([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4, color: 'orange' },
    { from: 2, to: 5 },
    { from: 3, to: 3 }
  ])

  useEffect(() => {
    const options = {
      /*
      layout: {
        hierarchical: true
      },
      */
      edges: {
        color: '#000000'
      },
      height: '500px',
      interaction: { hover: true },
      manipulation: {
        enabled: true
      }
    }

    if (container.current) {
      const network = new Network(container.current, { nodes, edges }, options)

      network.on('click', function (params: any) {
        console.log(JSON.stringify(params, null, 4))
        params.event = '[original event]'
        if (eventSpanHeading.current && eventSpanContent.current) {
          eventSpanHeading.current.innerText = 'Click event:'
          eventSpanContent.current.innerText = JSON.stringify(params, null, 4)
        }
        //        console.log('click event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM))
      })
      network.on('doubleClick', function (params) {
        params.event = '[original event]'
        if (eventSpanHeading.current && eventSpanContent.current) {
          eventSpanHeading.current.innerText = 'doubleClick event:'
          eventSpanContent.current.innerText = JSON.stringify(params, null, 4)
        }
      })
      network.on('oncontext', function (params) {
        params.event = '[original event]'
        if (eventSpanHeading.current && eventSpanContent.current) {
          eventSpanHeading.current.innerText = 'oncontext (right click) event:'
          eventSpanContent.current.innerText = JSON.stringify(params, null, 4)
        }
      })
      network.on('dragStart', function (params) {
        // There's no point in displaying this event on screen, it gets immediately overwritten
        params.event = '[original event]'
        console.log('dragStart Event:', params)
        //        console.log('dragStart event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM))
      })
      network.on('dragging', function (params) {
        params.event = '[original event]'
        if (eventSpanHeading.current && eventSpanContent.current) {
          eventSpanHeading.current.innerText = 'dragging event:'
          eventSpanContent.current.innerText = JSON.stringify(params, null, 4)
        }
      })
      network.on('dragEnd', function (params) {
        params.event = '[original event]'
        console.log('dragEnd Event:', params)
        //      console.log('dragEnd event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM))
      })
      network.on('controlNodeDragging', function (params) {
        params.event = '[original event]'
        if (eventSpanHeading.current && eventSpanContent.current) {
          eventSpanHeading.current.innerText = 'control node dragging event:'
          eventSpanContent.current.innerText = JSON.stringify(params, null, 4)
        }
      })
      network.on('controlNodeDragEnd', function (params) {
        params.event = '[original event]'
        if (eventSpanHeading.current && eventSpanContent.current) {
          eventSpanHeading.current.innerText = 'control node drag end event:'
          eventSpanContent.current.innerText = JSON.stringify(params, null, 4)
        }
        console.log('controlNodeDragEnd Event:', params)
      })
      network.on('zoom', function (params) {
        if (eventSpanHeading.current && eventSpanContent.current) {
          eventSpanHeading.current.innerText = 'zoom event:'
          eventSpanContent.current.innerText = JSON.stringify(params, null, 4)
        }
      })
      network.on('showPopup', function (params) {
        if (eventSpanHeading.current && eventSpanContent.current) {
          eventSpanHeading.current.innerText = 'showPopup event: '
          eventSpanContent.current.innerText = JSON.stringify(params, null, 4)
        }
      })
      network.on('hidePopup', function () {
        console.log('hidePopup Event')
      })
      network.on('select', function (params) {
        console.log('select Event:', params)
      })
      network.on('selectNode', function (params) {
        console.log('selectNode Event:', params)
      })
      network.on('selectEdge', function (params) {
        console.log('selectEdge Event:', params)
      })
      network.on('deselectNode', function (params) {
        console.log('deselectNode Event:', params)
      })
      network.on('deselectEdge', function (params) {
        console.log('deselectEdge Event:', params)
      })
      network.on('hoverNode', function (params) {
        console.log('hoverNode Event:', params)
      })
      network.on('hoverEdge', function (params) {
        console.log('hoverEdge Event:', params)
      })
      network.on('blurNode', function (params) {
        console.log('blurNode Event:', params)
      })
      network.on('blurEdge', function (params) {
        console.log('blurEdge Event:', params)
      })
    }
  }, [container, eventSpanHeading, nodes, edges])

  return (
    <>
      <div ref={container} style={{ height: '500px', width: '800px' }} />
      <h2 ref={eventSpanHeading} id="eventSpanHeading"></h2>
      <pre ref={eventSpanContent} id="eventSpanContent"></pre>
    </>
  )
}
