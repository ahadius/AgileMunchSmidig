package mo.com.excerise2;

import mo.com.Graph;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class MetroNettwork extends Node {

    private class edge{
    private Node from;
    private Node to;
    private int path;

    public void edge(Node from, Node to, int path) {
        this.from = from;
        this.to = to;
        this.path = path;
    }

}

        private HashMap<Integer, Node> nodes =new HashMap<>();
        private HashMap<String, List<edge>> adjacenyList =new HashMap<>();

        public void addEdge(String from, String to, int path) {
            var fromNode = nodes.get(from);
            if (fromNode == null) {
                throw new IllegalStateException();
            }
            var toNode = nodes.get(to);
            if (toNode == null)
                throw new IllegalStateException();
            adjacenyList.get(fromNode).add(new edge());
            adjacenyList.get(toNode).add(new edge());
        }

      public void print(){
        for (String source: adjacenyList.keySet()){
            var target = adjacenyList.get(source);
            if (!target.isEmpty()){
                System.out.println(source + "is connected" + target);
            }
        }
    }

}

